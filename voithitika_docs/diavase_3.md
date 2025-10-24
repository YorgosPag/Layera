PS C:\layera\esco-database> npm test

> @layera/esco-database@1.0.0 test
> jest

 FAIL  tests/import-service.test.ts
  ● Test suite failed to run

    scripts/import-esco.ts:586:9 - error TS2322: Type 'ESCOStats' is not assignable to type 'Record<string, unknown>'.       
      Index signature for type 'string' is missing in type 'ESCOStats'.

    586         data: stats
                ~~~~

      scripts/import-esco.ts:92:107
        92   async batchWrite<T extends Record<string, unknown>>(operations: Array<{ collection: string; id: string; data: T 
}>): Promise<BatchResult> {
                                                                                                                     ~~~~    
        The expected type comes from property 'data' which is declared here on type '{ collection: string; id: string; data: 
Record<string, unknown>; }'

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        4.53 s
Ran all test suites.
PS C:\layera\esco-database> 