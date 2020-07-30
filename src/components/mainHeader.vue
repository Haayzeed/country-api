<template>
    <div>
        <div class="new pt-3 pb-2 mb-5">
            <div class="container">
                <div class="row">
                    <div class="col-6">
                        <h5 class="font-weight-bold">Where in the world?</h5>
                    </div>
                    <div class="col-6">
                        <h5 class="font-weight-bold text-right"><label class="theme-switch" for="checkbox"><input type="checkbox" id="checkbox"></label> Dark Mode</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    mounted(){
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        else {        
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }    
    }
    toggleSwitch.addEventListener('change', switchTheme, false);
}     
}
</script>
<style scoped>
    .new{
        background: var(--secondary-color);
        box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.2);
    }
    @media(max-width: 576px){
        h5{
            font-size: 16px;
        }
    }
     @media(max-width: 380px){
        h5{
            font-size: 14px;
        }
    }
</style>