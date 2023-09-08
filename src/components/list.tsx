import { For, Accessor, Show } from "solid-js";

type ListProps = {
  maxLength: number;
  onClick: (arg0: { id: string }) => void;
  data: Array<{ id: string }>;
};

const List = (props: ListProps) => {
  return (
    <>
      <Show when={props.data.length > 0}>
        <ul class="border border-slate-600 divide-y divide-slate-600 rounded text-xs">
          <For each={props.data.slice(0, props.maxLength)}>
            {(item) => (
              <li
                class="py-1 px-2 cursor-pointer hover:underline overflow-hidden text-ellipsis"
                onClick={() => {
                  props.onClick(item);
                }}
              >
                <a href="#">{item.id}</a>
              </li>
            )}
          </For>
        </ul>
      </Show>
      <Show when={props.data.length > props.maxLength}>
        <div class="my-2 text-xs text-zinc-500 text-right">
          {props.data.length - props.maxLength} results hidden
        </div>
      </Show>
      <Show when={props.data.length === 0}>
        <div class="my-2 text-xs text-zinc-500">No data</div>
      </Show>
    </>
  );
};

export default List;
