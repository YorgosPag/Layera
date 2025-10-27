# =% ENTERPRISE HARDCODED VALUES REPLACEMENT - TASK SPECIFICATION

**•À¹²»­ÀÉ½ ‘ÁÇ¹Ä­ºÄ¿½±Â**: “¹ÎÁ³¿Â  ±³Î½·Â
**Status**: š¡™£™œŸ£ - 937+ hardcoded values µ½Ä¿À¯ÃÄ·º±½
**£ÄÌÇ¿Â**: 100% LEGO Systems compliance

## =Ë ‘‘›¥¤™šŸ£ Ÿ”—“Ÿ£ “™‘  ¡‘š¤Ÿ¡•£

### <¯ £¤Ÿ§Ÿ£ ‘ Ÿ£¤Ÿ›—£
‘½Ä¹º±Ä¬ÃÄ±Ã· **Ÿ›©** ÄÉ½ Ãº»·Á¿º¿´¹º¿À¿¹·¼­½É½ Ä¹¼Î½ ¼µ **Single Sources of Truth** ±ÀÌ Ä± ÅÀ¬ÁÇ¿½Ä± LEGO systems.

### =Ê ”™‘“©£— - 937+ HARDCODED VALUES •¤Ÿ ™£¤—š‘

#### **=¨ š‘¤—“Ÿ¡™‘ 1: Hardcoded Greek Text (i18n Violations)**
```typescript
// L ›‘˜Ÿ£ - Hardcoded µ»»·½¹º¬
CategoryStep.tsx:132 - '‘º¯½·Ä¿'
CategoryStep.tsx:132 - '•Á³±Ã¯±'
IntentStep.tsx:133 - ' Á¿ÃÆ¿Á¬'
IntentStep.tsx:133 - '‘½±¶®Ä·Ã·'
LocationStep.tsx:134 - '§¬ÁÄ·Â'
LocationStep.tsx:135 - ' µÁ¹¿Ç®'
LocationStep.tsx:135 - '”¹µÍ¸Å½Ã·'
```

** ›¥£—**: ‘½Ä¹º±Ä¬ÃÄ±Ã· ¼µ `@layera/tolgee`
```typescript
//  £©£¤Ÿ
import { useLayeraTranslation } from '@layera/tolgee';
const { t } = useLayeraTranslation();

// Usage
'‘º¯½·Ä¿' ’ t('category.property')
'•Á³±Ã¯±' ’ t('category.job')
' Á¿ÃÆ¿Á¬' ’ t('intent.offer')
```

#### **=¨ š‘¤—“Ÿ¡™‘ 2: Hardcoded Colors/Hex Values**
```typescript
// L ›‘˜Ÿ£ - DeviceModelSelector.tsx
background: currentModel ? '#4F46E5' : '#6B7280',  // ³Á±¼¼® 155
background: !currentModel ? '#EBF5FF' : 'white',   // ³Á±¼¼® 197
color: '#6B7280',                                  // ³Á±¼¼® 214
backgroundColor: '#F9FAFB',                        // ³Á±¼¼® 215
color: '#9CA3AF',                                  // ³Á±¼¼® 253
frameColor: '#1c1c1e',                            // deviceSpecs
```

** ›¥£—**: ‘½Ä¹º±Ä¬ÃÄ±Ã· ¼µ `@layera/constants`
```typescript
//  £©£¤Ÿ
import { DEVICE_FRAME_COLORS, BRAND_COLORS, UI_COLORS } from '@layera/constants';

// Usage
'#4F46E5' ’ BRAND_COLORS.PRIMARY
'#6B7280' ’ BRAND_COLORS.SECONDARY
'#EBF5FF' ’ UI_COLORS.INFO_SUBTLE
'#F9FAFB' ’ UI_COLORS.SURFACE_DEFAULT
'#1c1c1e' ’ DEVICE_FRAME_COLORS.SPACE_GRAY
```

#### **=¨ š‘¤—“Ÿ¡™‘ 3: Magic Numbers/Spacing**
```typescript
// L ›‘˜Ÿ£ - Hardcoded spacing
width: 32px;        // MapContainer.tsx:50
height: 32px;       // MapContainer.tsx:50
fontSize: '14px',   // DeviceModelSelector.tsx:160
gap: '8px',         // DeviceModelSelector.tsx:165
minWidth: '200px',  // DeviceModelSelector.tsx:166
maxHeight: '400px', // DeviceModelSelector.tsx:186
```

** ›¥£—**: ‘½Ä¹º±Ä¬ÃÄ±Ã· ¼µ `@layera/constants`
```typescript
//  £©£¤Ÿ
import { SPACING_SCALE, FONT_SIZES, FIXED_DIMENSIONS } from '@layera/constants';

// Usage
32px ’ SPACING_SCALE.XL
14px ’ `${FONT_SIZES.SM}px`
8px ’ SPACING_SCALE.SM
200px ’ FIXED_DIMENSIONS.MIN_BUTTON_WIDTH
400px ’ FIXED_DIMENSIONS.DROPDOWN_MAX_HEIGHT
```

#### **=¨ š‘¤—“Ÿ¡™‘ 4: Status/State Values**
```typescript
// L ›‘˜Ÿ£ - Hardcoded status strings
'uploading' | 'completed' | 'error'  // UploadCard.tsx
'draft' | 'published'               // ReviewStep.tsx
'light' | 'dark'                    // ThemeSwitcher.tsx
```

** ›¥£—**: ”·¼¹¿ÅÁ³¯± enum ÃÄ¿ `@layera/constants`
```typescript
//  £©£¤Ÿ -  Á¿Ã¸®º· ÃÄ¿ config.ts
export const UPLOAD_STATUS = {
  UPLOADING: 'uploading',
  COMPLETED: 'completed',
  ERROR: 'error'
} as const;

export const THEME_VARIANTS = {
  LIGHT: 'light',
  DARK: 'dark'
} as const;
```

#### **=¨ š‘¤—“Ÿ¡™‘ 5: CSS-in-JS ¼µ Magic Values**
```typescript
// L ›‘˜Ÿ£ - Inline styles
style={{
  padding: '16px',
  margin: '8px',
  borderRadius: '4px',
  fontSize: '12px'
}}
```

** ›¥£—**: CSS Variables ±ÀÌ `@layera/tokens`
```typescript
//  £©£¤Ÿ
style={{
  padding: 'var(--la-space-4)',
  margin: 'var(--la-space-2)',
  borderRadius: 'var(--la-radius-sm)',
  fontSize: 'var(--la-font-size-xs)'
}}
```

### <¯ £¥“š•š¡™œ•‘ ‘¡§•™‘  Ÿ¥ §¡•™‘–Ÿ¤‘™ ‘œ•£— • •œ’‘£—

#### **1. DeviceModelSelector.tsx**
- ** Á¿ÄµÁ±¹ÌÄ·Ä±**: š¡™£™œ—
- **Hardcoded values**: 15+ hex colors, spacing, font sizes
- **LEGO solutions**: DEVICE_FRAME_COLORS, SPACING_SCALE, FONT_SIZES

#### **2. CategoryStep.tsx**
- ** Á¿ÄµÁ±¹ÌÄ·Ä±**: š¡™£™œ—
- **Hardcoded values**: '‘º¯½·Ä¿', '•Á³±Ã¯±' + UI styling
- **LEGO solutions**: @layera/tolgee, SPACING_SCALE

#### **3. IntentStep.tsx**
- ** Á¿ÄµÁ±¹ÌÄ·Ä±**: š¡™£™œ—
- **Hardcoded values**: ' Á¿ÃÆ¿Á¬', '‘½±¶®Ä·Ã·' + styling
- **LEGO solutions**: @layera/tolgee, UI_COLORS

#### **4. MapContainer.tsx**
- ** Á¿ÄµÁ±¹ÌÄ·Ä±**: ¥¨—›—
- **Hardcoded values**: 32px dimensions, undefined SPACING_SCALE values
- **LEGO solutions**: FIXED_DIMENSIONS, SPACING_SCALE fixes

#### **5. ThemeSwitcher.tsx**
- ** Á¿ÄµÁ±¹ÌÄ·Ä±**: œ•£‘™‘
- **Hardcoded values**: 'light'/'dark' theme strings
- **LEGO solutions**: THEME_VARIANTS constant

### =à ’—œ‘- ¡Ÿ£-’—œ‘ Ÿ”—“™•£ “™‘  ¡‘š¤Ÿ¡•£

#### **’—œ‘ 1:  Á¿µÄ¿¹¼±Ã¯±**
```bash
# •À¹²µ²±¯ÉÃ· LEGO systems
grep -r "from '@layera/constants'" packages/
grep -r "from '@layera/tolgee'" packages/
```

#### **’—œ‘ 2: •½Ä¿À¹Ã¼ÌÂ Hardcoded Values**
```bash
# •ÍÁµÃ· hex colors
grep -r "#[0-9A-Fa-f]\{6\}" apps/

# •ÍÁµÃ· µ»»·½¹ºÎ½ strings
grep -r "\".*[±-É‘-©].*\"" apps/

# •ÍÁµÃ· magic numbers
grep -r "[0-9]\+px" apps/
```

#### **’—œ‘ 3: ‘½Ä¹º±Ä¬ÃÄ±Ã· ¼µ LEGO Systems**
1. **Import Ä± ÃÉÃÄ¬ constants**:
   ```typescript
   import { DEVICE_FRAME_COLORS, SPACING_SCALE, FONT_SIZES } from '@layera/constants';
   import { useLayeraTranslation } from '@layera/tolgee';
   ```

2. **‘½Ä¹º±Ä¬ÃÄ±Ã· hardcoded values**:
   ```typescript
   //  Á¹½
   backgroundColor: '#F9FAFB'

   // œµÄ¬
   backgroundColor: UI_COLORS.SURFACE_DEFAULT
   ```

3. ** Á¿Ã¸®º· ½­É½ constants ÌÀ¿Å ÇÁµ¹¬¶µÄ±¹**:
   ```typescript
   // £Ä¿ packages/constants/src/config.ts
   export const NEW_CONSTANT = {
     VALUE: 'specific_value'
   } as const;
   ```

#### **’—œ‘ 4: Validation**
```bash
# TypeScript check
npm run typecheck

# ˆ»µ³Ç¿Â ³¹± µ½±À¿¼µ¯½±½Ä± hardcoded values
grep -r "#[0-9A-Fa-f]\{6\}" apps/ | wc -l  # Should decrease
grep -r "\".*[±-É‘-©].*\"" apps/ | wc -l   # Should decrease
```

### <¯ š¡™¤—¡™‘ • ™¤¥§™‘£

#### ** • ™¤¥§—£ ‘¤™š‘¤‘£¤‘£—**
- [ ] **Zero hex colors** ÃÄ¿½ ºÎ´¹º± (Ì»± ±ÀÌ constants)
- [ ] **Zero hardcoded µ»»·½¹º¬** (Ì»± ±ÀÌ @layera/tolgee)
- [ ] **Zero magic numbers** (Ì»± ±ÀÌ SPACING_SCALE/FONT_SIZES)
- [ ] **100% TypeScript compliance** (npm run typecheck passes)
- [ ] **›µ¹Ä¿ÅÁ³¹º­Â µÆ±Á¼¿³­Â** (localhost:3000, localhost:3001)

#### **  Ÿ™Ÿ¤™šŸ™ ”•™š¤•£**
- [ ] **šÎ´¹º±Â readable** º±¹ maintainable
- [ ] **Consistency** ÃÄ· ÇÁ®Ã· LEGO systems
- [ ] **No breaking changes** ÃÄ¿ UI/UX
- [ ] **Proper error handling** ³¹± missing translations

### =¨ š¡™£™œ•£  ¡Ÿ•™”Ÿ Ÿ™—£•™£

#### **L œ— š‘•¤•**
1. **œ— ±Æ±¹Á­ÃµÄµ** existing functionality
2. **œ— ÃÀ¬ÃµÄµ** Ä¿ UI layout
3. **œ— ´·¼¹¿ÅÁ³®ÃµÄµ** circular dependencies
4. **œ— ÇÁ·Ã¹¼¿À¿¹®ÃµÄµ** Ä± À±»¹¬ LayeraIcons.tsx (•ž‘›•™¦˜—š•)

#### **  ‘¤Ÿ¤• š‘•¤•**
1. ** ‘¤Ÿ¤• test** ¼µÄ¬ ±ÀÌ º¬¸µ ±»»±³®
2. ** ‘¤Ÿ¤• import** ±ÀÌ @layera packages
3. ** ‘¤Ÿ¤• check** TypeScript errors
4. ** ‘¤Ÿ¤• document** ½­± constants À¿Å ÀÁ¿Ã¸­ÄµÄµ

### =Ê TRACKING PROGRESS

#### **œ•¤¡™š‘  ¡ŸŸ”Ÿ¥**
```bash
# Daily compliance check
echo "=Ê Hardcoded Values Elimination Progress"
echo "<¯ Hex colors remaining: $(grep -r '#[0-9A-Fa-f]\{6\}' apps/ | wc -l)"
echo "<ì<÷ Greek hardcoded: $(grep -r '\".*[±-É‘-©].*\"' apps/ | wc -l)"
echo "=Ï Magic numbers: $(grep -r '[0-9]\+px' apps/ | wc -l)"
echo " LEGO imports: $(grep -r \"from '@layera/\" apps/ | wc -l)"
```

### =Ë ASSIGNMENT DISTRIBUTION

#### **£¥™£¤©œ•— š‘¤‘Ÿœ— •¡“‘£™‘£**
- **Agent 1**: DeviceModelSelector.tsx + device frame colors
- **Agent 2**: CategoryStep.tsx + IntentStep.tsx (i18n)
- **Agent 3**: MapContainer.tsx + spacing issues
- **Agent 4**: ThemeSwitcher.tsx + status constants
- **Agent 5**: CSS-in-JS to CSS Variables conversion

#### **COORDINATION**
- **š¿¹½Ì branch**: `feature/hardcoded-values-elimination`
- **PR naming**: `feat: replace hardcoded values in [ComponentName]`
- **Review requirement**: Mandatory review ±ÀÌ Enterprise Architect

---

## <Æ • ™˜¥œ—¤Ÿ ‘ Ÿ¤•›•£œ‘

**Enterprise-grade codebase ¼µ:**
- **100% LEGO Systems compliance**
- **Zero hardcoded values**
- **Perfect i18n coverage**
- **Maintainable º±¹ scalable ±ÁÇ¹ÄµºÄ¿½¹º®**

**£¤Ÿ§Ÿ£**: ‘ÀÌ 937+ hardcoded values ’ **0 hardcoded values**

**DEADLINE**: †¼µÃ· ÀÁ¿ÄµÁ±¹ÌÄ·Ä± - Enterprise production readiness

---

**•À¹²»­ÀÉ½**: “¹ÎÁ³¿Â  ±³Î½·Â
**Contact**: Enterprise Architecture Team
**Reference**: LEGO_SYSTEMS_REGISTRY.md, ENTERPRISE_MIGRATION_REPORT.md