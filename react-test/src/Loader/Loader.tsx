import { PropsWithChildren } from "react";

export default function Loader({children, condition}: PropsWithChildren<{condition: boolean}>) {
  return <>{condition ? children : <span>Loading...</span>}</>;
}