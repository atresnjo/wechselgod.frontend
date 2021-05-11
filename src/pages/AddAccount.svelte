<script lang="ts">
    import { Link } from 'svelte-navigator'
    import Title from '../components/Title.svelte'
    import Subtitle from '../components/Subtitle.svelte'
    import Select from 'svelte-select'
    import Icon from '../components/Icon.svelte'
    import { findBank, importBank } from '../client/api'
    import Navigation from '../components/Navigation.svelte'

    const optionIdentifier = 'id'
    let selectedBank: any

    async function loadOptions(filterText) {
        filterText = filterText ? filterText.replace(' ', '_') : ''
        var result = await findBank(filterText)
        return result.map((x) => ({ value: x.id, label: x.name }))
    }

    const addBankAccount = async () => {
        var response = await importBank(selectedBank)
        window.location.replace(response.redirectUrl)
    }
    const handleSelect = (event: any) => (selectedBank = event.detail.value)
</script>

<div class="h-full w-full bg-base-content absolute">
    <Navigation />
    <div class="max-w-7xl lg:my-12 container px-6 mx-auto flex flex-col ">
        <div class="flex flex-col">
            <div class="flex flex-col">
                <ul class="flex text-primary text-sm lg:text-base">
                    <li class="inline-flex items-center">
                        <Link to="/dashboard">Meine Konten</Link>
                        <svg
                            class="h-5 w-auto text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </li>
                    <li class="inline-flex items-center">
                        <a href="/components">Bankkonto hinzufügen</a>
                    </li>
                </ul>
                <div
                    class="flex items-center justify-between text-primary  w-full my-4  sm:pr-4"
                >
                    <div class="mr-6 space-y-1">
                        <Title text={'Bankkonto hinzufügen'} />
                        <Subtitle text={' Lass uns zusammen Geld sparen! 💰'} />
                    </div>
                </div>
            </div>
            <div class="flex pt-40 flex-col w-8/12 self-center">
                <div class="max-w-md mx-auto">
                    <div class="divide-y">
                        <div
                            class="py-8 text-base leading-6 space-y-4  sm:text-lg sm:leading-7"
                        >
                            <h3
                                class="text-1xl md:text-4xl font-bold tracking-tight leading-7 md:leading-10 truncate text-primary"
                            >
                                Wo hast Du Dein Konto?
                            </h3>
                        </div>
                    </div>
                </div>

                <div class="icon">
                    <Select
                        {Icon}
                        on:select={handleSelect}
                        bind:selectedValue={selectedBank}
                        {optionIdentifier}
                        {loadOptions}
                        noOptionsMessage="Keine Bank gefunden..."
                        placeholder="Name, BLZ oder BIC suchen"
                    />
                </div>

                <div class="flex justify-center pt-10">
                    <button
                        on:click={addBankAccount}
                        class="btn btn-primary text-primary-content font-bold py-2 px-3"
                        >Hinzufügen</button
                    >
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .icon {
        --selectedItemPadding: 0 10px 0 8px;
        --inputPadding: 0 1px 0 50px;
    }
</style>
