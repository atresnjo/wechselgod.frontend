<script lang="ts">
    import Login from './pages/Login.svelte'
    import AddAccount from './pages/AddAccount.svelte'
    import { Router, Route } from 'svelte-navigator'
    import Dashboard from './pages/Dashboard.svelte'
    import AccountOverview from './pages/BankAccountOverview.svelte'
    import Signup from './pages/Signup.svelte'
</script>

<Router>
    <Route path="/" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/auth/create" component={Signup} />
    <Route path="/auth/login" component={Login} />
    <Route path="/accounts/add" component={AddAccount} />
    <Route path="/accounts/*">
        <Route path="/add">
            <AddAccount />
        </Route>
        <Route path=":id" component={AccountOverview} />
    </Route>
</Router>
