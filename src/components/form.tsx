import type { Accessor, Setter } from "solid-js";
import { snakeCase } from "/src/util/general";

interface SliderInputProps {
  displayName: string;
  accessor: Accessor<number>;
  setter: Setter<number>;
  min: number;
  max: number;
  step: number;
}

export const SliderInput = (props: SliderInputProps) => {
  const id = snakeCase(props.displayName);

  return (
    <div class="flex items-center justify-between gap-2">
      <label for={id}>{props.displayName}</label>
      <div>{props.accessor()}</div>
      <input
        value={props.accessor()}
        class="p-1 w-8/12 border bg-slate-700 border-slate-600 rounded"
        onInput={(e) => props.setter(Number(e.currentTarget.value))}
        id={id}
        type="range"
        min={String(props.min)}
        max={String(props.max)}
        step={String(props.step)}
      />
    </div>
  );
};

interface TextInputProps {
  placeholder?: string;
  accessor: Accessor<string>;
  setter: Setter<string>;
}

export const TextInput = (props: TextInputProps) => {
  return (
    <input
      class="p-1 w-8/12 border bg-slate-700 border-slate-600 rounded"
      type="text"
      value={props.accessor()}
      onInput={(e) => props.setter(e.currentTarget.value)}
      placeholder={props.placeholder}
    />
  );
};
