<template>
    <div>
        <div class="new py-3 mb-5">
            <div class="container">
                <div class="row">
                    <div class="col-6">
                        <h5 class="font-weight-bold">Where in the world?</h5>
                    </div>
                    <div class="col-6">
                        <h5 class="font-weight-bold text-right"> Dark Mode</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .new{
        background: var(--secondary-color);
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