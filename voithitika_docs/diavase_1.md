Έναρξη με «Phase 1 — μηχανικά fixes» για μαζική μείωση TS σφαλμάτων χωρίς αλλαγή συμπεριφοράς. Δεν πειράζουμε tokens.json ούτε CSS ακόμη. SSOT και LEGO-first ισχύουν παντού. 

LEGO_SYSTEMS_REGISTRY

CLAUDE — TASK 1 (Phase 1: Preflight + Codemods + Box/Flex)
Σκοπός

Κλείσε κατά προτεραιότητα:

TS2322/“…not assignable to type 'void'”

TS6133/unused

Προβλήματα ref/props σε Box/Flex με forwardRef

Φρουροί

Μην αλλάξεις tokens.json ή τιμές tokens. SSOT παραμένει @layera/tokens. 

LEGO_SYSTEMS_REGISTRY

Μην αγγίξεις runtime logic. Μόνο τύπους, υπογραφές, codemods.

Καμία «μάσκα» τύπων με any.

Inline styles δεν αγγίζονται σε Phase 1. Μόνο report. Πολιτική LEGO/SSOT ισχύει. 

LEGO_SYSTEMS_REGISTRY

Βήματα εκτέλεσης

Κλάδος και baseline

git checkout -b chore/ts-phase1-mechanical-fixes

npm ci
npm run ssot:check        # μόνο report, καμία αλλαγή
npm run lint:css          # μόνο report
npm run typecheck | tee logs/typecheck.before.txt


ESLint auto-fix για “unused”

npx eslint "packages/**/{src,lib}/**/*.{ts,tsx}" --fix


Εγκατάσταση εργαλείων codemod

npm i -D ts-morph ts-node glob
mkdir -p scripts/codemods


Codemod: αφαίρεση ρητού : void όπου επιστρέφεται JSX/useMemo

Δημιούργησε scripts/codemods/fix-void-returns.ts:

import { Project, SyntaxKind, Node, ArrowFunction, FunctionDeclaration, FunctionExpression } from "ts-morph";

const project = new Project({ tsConfigFilePath: "tsconfig.json" });
project.addSourceFilesAtPaths(["packages/**/src/**/*.{ts,tsx}", "apps/**/src/**/*.{ts,tsx}"]);

const isFn = (n: Node): n is ArrowFunction|FunctionDeclaration|FunctionExpression =>
  [SyntaxKind.ArrowFunction, SyntaxKind.FunctionDeclaration, SyntaxKind.FunctionExpression].includes(n.getKind());

for (const sf of project.getSourceFiles()) {
  sf.forEachDescendant((node) => {
    if (!isFn(node)) return;
    const rt = node.getReturnTypeNode();
    if (!rt || rt.getText().trim() !== "void") return;
    const body = node.getBodyText() ?? "";
    if (body.includes("return <") || body.includes("return React.createElement") || body.includes("useMemo(")) {
      node.removeReturnType();
    }
  });
}
project.saveSync();


Τρέξιμο:

npx ts-node scripts/codemods/fix-void-returns.ts


Codemod: helpers που επιστρέφουν JSX αλλά έχουν υπογραφή (): void → (): React.ReactNode

Δημιούργησε scripts/codemods/fix-helper-jsx-returns.ts:

import { Project, SyntaxKind } from "ts-morph";
const project = new Project({ tsConfigFilePath: "tsconfig.json" });
project.addSourceFilesAtPaths(["packages/**/src/**/*.{ts,tsx}", "apps/**/src/**/*.{ts,tsx}"]);

for (const sf of project.getSourceFiles()) {
  const fns = sf.getFunctions().concat(sf.getVariableDeclarations()
    .map(v => v.getInitializer())
    .filter((i): i is any => !!i && [SyntaxKind.ArrowFunction, SyntaxKind.FunctionExpression].includes(i.getKind())));
  for (const fn of fns) {
    const rt = (fn.getReturnTypeNode && fn.getReturnTypeNode()) || null;
    const body = fn.getBodyText?.() ?? "";
    if (rt && rt.getText().trim() === "void" && body.includes("return <")) {
      // Αν δεν υπάρχει import React, πρόσθεσέ το
      const sf = fn.getSourceFile();
      if (!sf.getImportDeclarations().some(d => d.getModuleSpecifierValue() === "react")) {
        sf.addImportDeclaration({ moduleSpecifier: "react", namedImports: ["React"] });
      }
      fn.setReturnType("React.ReactNode");
    }
  }
}
project.saveSync();


Τρέξιμο:

npx ts-node scripts/codemods/fix-helper-jsx-returns.ts


Patch @layera/layout: Box/Flex props + forwardRef (τυπικό, μη παρεμβατικό)

packages/layout/src/components/Box.tsx:

- export interface BoxProps { children?: React.ReactNode; /* περιορισμένα props */ }
- export function Box(props: BoxProps) { /* ... */ }
+ import React from "react";
+ export type BoxStyleKeys = Pick<React.CSSProperties,
+  | "marginTop" | "marginBottom" | "marginLeft" | "marginRight"
+  | "paddingTop" | "paddingBottom" | "paddingLeft" | "paddingRight"
+  | "alignItems" | "justifyContent" | "flexDirection" | "flexWrap" | "gap"
+  | "position" | "zIndex" | "boxShadow" | "borderRadius" | "overflowY"
+  | "boxSizing" | "inset">;
+ export interface BoxProps extends React.HTMLAttributes<HTMLDivElement>, BoxStyleKeys {
+   children?: React.ReactNode;
+ }
+ export const Box = React.forwardRef<HTMLDivElement, BoxProps>(function Box(props, ref) {
+   const { children, ...rest } = props;
+   return <div ref={ref} {...rest}>{children}</div>;
+ });


packages/layout/src/components/Flex.tsx (αντίστοιχη προσαρμογή):

+ import React from "react";
- export interface FlexProps { /* ... */ }
+ export interface FlexProps extends React.HTMLAttributes<HTMLDivElement>, BoxStyleKeys {
+   children?: React.ReactNode;
+   direction?: React.CSSProperties["flexDirection"];
+ }
- export function Flex(props: FlexProps) { /* ... */ }
+ export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(function Flex(props, ref) {
+   const { children, direction = "row", style, ...rest } = props;
+   return <div ref={ref} style={{ display: "flex", flexDirection: direction, ...style }} {...rest}>{children}</div>;
+ });


Σημείωση: Το patch επιτρέπει ref και συνήθη CSS keys που ήδη χρησιμοποιούνται σε components. Μειώνει μαζικά σφάλματα τύπου “Property 'ref' does not exist on type 'BoxProps'” κ.λπ., χωρίς αλλαγή συμπεριφοράς.

Typecheck και καταγραφή

npm run typecheck | tee logs/typecheck.after.phase1.txt
git add -A
git commit -m "chore(ts): phase-1 mechanical fixes (eslint + codemods + Box/Flex forwardRef)"


Αναφορά εξόδου

Δώσε: σύνολο TS errors πριν/μετά, #αλλαγμένων αρχείων ανά βήμα, ενδεικτικά patterns που έφυγαν (TS2322, TS6133).

Μην κάνεις push σε main. Άνοιξε PR με τίτλο: chore(ts): phase-1 mechanical fixes και περιέλαβε τα logs.

Accept/Done criteria

Μείωση ≥60% στα TS2322/“…void” και πλήρης καθαριότητα για TS6133.

Κανένα νέο lint error υψηλής σοβαρότητας.

Καμία αλλαγή σε snapshots/visuals.

SSOT/LEGO πολιτική δεν παραβιάζεται. 

LEGO_SYSTEMS_REGISTRY

Επόμενο (όταν ολοκληρώσεις Task 1)

Θα δώσω Task 2: στοχευμένο patch για constants compatibility ή guided codemod αντικατάστασης παλαιών LAYOUT_* / CONTAINER_* με επίσημα tokens, ώστε να μη ρισκάρουμε λάθος τιμές. 

LEGO_SYSTEMS_REGISTRY

Προχώρα με Task 1. Όταν τελειώσει ο πράκτορας, στείλε μου: diff/PR link, μετρικές πριν/μετά, και 3–5 αρχεία δείγμα όπου λύθηκαν τα : void/JSX.