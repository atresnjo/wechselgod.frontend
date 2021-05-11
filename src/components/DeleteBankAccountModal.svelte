<script lang="ts">
    import { openDeleteBankAccountModal } from '../store'
    import ModalContent from '../components/ModalContent.svelte'
    import { deleteBank } from '../client/api'

    const close = () => ($openDeleteBankAccountModal = { show: false })
    let isDeleting: boolean = false
    const deleteSelectedBankAccount = async () => {
        try {
            isDeleting = true
            await deleteBank(
                $openDeleteBankAccountModal.bankAccount.bankConnectionId
            )
        } catch (err) {
        } finally {
            isDeleting = false
            close()
        }
    }
</script>

<div
    class="fixed top-0 w-full h-screen overflow-hidden opacity-95 bg-gray-700 flex flex-col items-center justify-center {$openDeleteBankAccountModal.show
        ? 'visible'
        : 'hidden'}"
>
    <div
        class="relative px-4 min-h-screen md:flex md:items-center md:justify-center"
    >
        <div
            class="shadow-xl modal-box compact side rounded-xl overflow-hidden bg-content-400 md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative"
        >
            <div class="md:flex items-center">
                <div class="mt-4 md:mt-0 text-center md:text-left">
                    <ModalContent
                        title="Konto löschen ❌"
                        text="Sind sie sich sicher?"
                    />
                </div>
            </div>
            <div class="text-center md:text-right mt-4 md:flex md:justify-end">
                <div class="modal-action">
                    <button
                        class:loading={isDeleting}
                        on:click={deleteSelectedBankAccount}
                        class="btn btn-primary">Bestätigen</button
                    >
                    <button on:click={close} class="btn btn-outline"
                        >Abbrechen</button
                    >
                </div>
            </div>
        </div>
    </div>
</div>
