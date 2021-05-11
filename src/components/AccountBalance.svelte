<script lang="ts">
    export let isNegative: boolean
    export let balance: string
    export let overview: boolean
</script>

<span
    class="{overview ? 'text-2xl tracking-wider' : 'font-bold'} {isNegative
        ? 'text-error'
        : 'text-primary'}">{balance} €</span
>
