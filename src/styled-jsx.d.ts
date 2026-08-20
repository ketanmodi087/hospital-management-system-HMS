// styled-jsx.d.ts
declare module "styled-jsx" {
  import * as React from "react";

  export interface StyleProps {
    children: React.ReactNode;
    jsx?: boolean;
  }

  export const Style: React.FC<StyleProps>;
}
