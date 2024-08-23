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
  export let className: string = '';

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
      currentNode.setAttribute('fill', color || currentNode.getAttribute('fill') || '');
      currentNode.setAttribute('width', width || currentNode.getAttribute('width') || '');
      currentNode.setAttribute('height', height || currentNode.getAttribute('height') || '');
      currentNode.setAttribute('class', className || currentNode.getAttribute('className') || '');
    }

    template.children?.forEach((child) => {
      let childAttributes = child.attributes as Array<ChildrenAttribute>;
      childAttributes?.forEach((childrenAttribute) => {
        if (childrenAttribute.name === 'stroke' || childrenAttribute.name === 'fill') {
          childrenAttribute.value[0].data = color;
        }
      });
      currentNode.appendChild(generateSvg(child));
    });

    return currentNode;
  }
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html generateSvg(parseIcon.html).innerHTML}

<style>
  i[data-type='icon'] :global(svg) {
    fill: var(--color);
  }
</style>
