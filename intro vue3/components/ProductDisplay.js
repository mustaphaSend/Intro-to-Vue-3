app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `
    <div class="product-display">
        <div class="product-container">
        <div class="product-image">
            <img :class="{ 'out-of-stock-img': !inventory }" :src="image" alt="socks">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <h2 v-if="onSale">{{ sale}}</h2>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p>
            <p v-else >Out of Stock</p>
            <a v-show="inventory" :href="url">Link</a>
            <p>Shipping: {{ shipping }}</p>
            <product-details :details="details"></product-details>
            <product-details :sizes="sizes"></product-details>
            <div 
                v-for="(variant, index) in variants" 
                :key="variant.id" 
                @mouseover="updateVariant(index)"
                class="color-circle"
                :style="{backgroundColor: variant.color}"
            >
            </div>
            <div>
                <button 
                    class="button" 
                    :class="{ disabledButton: !inventory }"
                    :disabled="!inventory"
                    v-on:click="addToCart"
                >
                Add to Cart
                </button>
                <button 
                    class="button" 
                    @click="removeFromCart"
                >
                Remove item
                </button>
            </div>
        </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
    </div>`,

    data() {
        return {
            product: 'Socks',
            brand: "Vue Mastery",
            selectedVariant: 0,
            // image: './assets/images/socks_green.jpg',
            url: "https://www.nordstrom.com/browse/men/clothing/socks?filterByColor=green",
            // inventory: 10,
            onSale: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            sizes: ["S", "M", "L"],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50},
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0}
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
        this.selectedVariant = index
        // console.log(index)
        },
        addReview(review) {
            this.reviews.push(review)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        }, 
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' is on sale'
            }
            return ''
        },
        image() {
            return this.variants[this.selectedVariant].image
        }, 
        inventory() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    } 
})