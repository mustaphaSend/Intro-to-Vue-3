app.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        },
        sizes: {
            type: Array,
            required: true
        }

    },
    template:
    /*html*/
    `<ul>
        <li v-for="detail in details">{{ detail }}</li>
        <li v-for="size in sizes">{{ size }}</li>
    </ul>`    
})