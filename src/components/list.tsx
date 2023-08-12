import { For, Accessor } from "solid-js";

type ListProps = {
  maxLength: number;
  onClick: (arg0: { id: string }) => void;
  data: Array<{ id: string }>;
};

const List = (props: ListProps) => {
  return (
    <ul class="border border-slate-600 divide-y divide-slate-600 rounded text-xs">
      <For each={props.data.slice(0, props.maxLength)}>
        {(item) => (
          <li
            class="py-1 px-2 cursor-pointer hover:underline"
            onClick={() => {
              props.onClick(item);
            }}
          >
            <a href="#">{item.id}</a>
          </li>
        )}
      </For>
    </ul>
  );
};

export default List;
