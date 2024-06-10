<script lang="ts">
  interface ChildrenAttribute {
    name: string;
    value: [{ data: string }];
  }

  import { parse } from 'svelte/compiler';
  import type { Ast, TemplateNode } from 'svelte/types/compiler/interfaces';

  export let icon: string = '';
  export let color: string = '';
  export let width: string = '';
  export let height: string = '';

  let parseIcon: Ast = parse(icon);
  function generateSvg(template: TemplateNode): HTMLElement {
    let currentNode = document.createElement(
      template.type === 'Fragment' ? 'i' : template.name || template.type
    ) as HTMLElement;

    let templateAttributes = template.attributes as Array<ChildrenAttribute>;

    templateAttributes?.forEach((attr) => {
      currentNode.setAttribute(attr.name, attr.value[0].data);
    });

    if (template.name === 'svg') {
      currentNode.setAttribute('fill', color);
      currentNode.setAttribute('width', width);
      currentNode.setAttribute('height', height);
    }

    template.children?.forEach((child) => {
      let childNode = document.createElement(child.name) as HTMLElement;
      let childAttributes = child.attributes as Array<ChildrenAttribute>;
      childAttributes?.forEach((childrenAttribute) => {
        childNode.setAttribute(childrenAttribute.name, childrenAttribute.value[0].data);
      });
      currentNode.appendChild(generateSvg(child));
    });

    return currentNode;
  }

  // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m12 5.69 5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3 2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>
</script>

<!-- <i data-type="icon"> -->
<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<!-- {@html icon} -->
<!-- </i> -->

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html generateSvg(parseIcon.html).innerHTML}

<style>
  i[data-type='icon'] :global(svg) {
    fill: var(--color);
  }
</style>
