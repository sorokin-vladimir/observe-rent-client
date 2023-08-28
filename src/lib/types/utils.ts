export type ArrayElement<ArrayType extends readonly unknown[] | undefined> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
