<script lang="ts">
  import { SvelteComponent } from 'svelte';

  interface ComponentProps {
    size: string;
    width: string;
    height: string;
    color: string;
    viewBox: string;
    style: { [key: string]: string };
    class: string;
  }

  interface Props extends ComponentProps {
    component: SvelteComponent<ComponentProps>;
  }

  export let {
    color,
    component: Component,
    height,
    size,
    style,
    viewBox,
    width,
    class: className
  } = $$props as Props;
</script>

<Component {color} {height} {size} {style} {viewBox} {width} class={className} />
