<script lang="ts">
    export let title: string;
    export let text: string;
    export let warning: string = '';
  </script>
  
  <p class="font-bold text-2xl text-base-content">{title}</p>
  <p class="pt-3 text-xl text-base-content mt-1">
    {text}
  </p>
  <p class="mt-6 font-bold text-error">{warning}</p>
  