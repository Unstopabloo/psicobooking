import { Formity, OnReturn } from "formity";

import components from "./components.tsx";
import schema from "./schema";

interface FormProps {
  onReturn: OnReturn;
}

export default function Form({ onReturn }: FormProps) {
  return (
    <Formity components={components} schema={schema} onReturn={onReturn} />
  );
}