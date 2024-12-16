import { create } from "zustand";
import axios from "../lib/axios";
import {toast} from "react-hot-toast";

export const useCartStore = create((set,get) => ({
    cart:[],//gio hang
    coupon:null,
    total:0,//tong tien
    subtotal:0,//tong tien san pham
    isCouponApplied:false,

    getCartItems: async () => {
       try {
        const res = await axios.get("/cart");
        set({cart:res.data});//gan du lieu cart vao store
        get().calculateTotals();
        console.log("Cart loaded from backend:", res.data); 
        res.data.forEach(item => {
            console.log("Item in cart:", item);  // Kiểm tra xem mỗi sản phẩm có trường quantity không
        });
       } catch (error) {
        set({cart:[]});//
        toast.error(error.response.data.message || "An error occurred");
       }
    },
    clearCart: async () => {
		set({ cart: [], coupon: null, total: 0, subtotal: 0 });
	},
    
    addToCart: async (product) => {
        try {
            await axios.post("/cart",{productId:product._id});// backend trong cart.controller.js
            toast.success("Product added to cart");

            set((prevState) => {
				const existingItem = prevState.cart.find((item) => item._id === product._id);// tim san pham co id tuong ung trong gio hang
				const newCart = existingItem
					? prevState.cart.map((item) =>
							item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
					  )// cap nhat so luong san pham trong gio hang
					: [...prevState.cart, { ...product, quantity: 1 }];// them san pham vao gio hang
				return { cart: newCart };// gan du lieu cart vao store
			});
            get().calculateTotals();

        } catch (error) {
            toast.error(error.response.data.message || "An error occurred");
        }
    },
    updateQuantity: async (productId, quantity) => {
		if (quantity === 0) {
			get().removeFromCart(productId);
			return;
		}

		await axios.put(`/cart/${productId}`, { quantity });
		set((prevState) => ({
			cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
		}));
		get().calculateTotals();
	},
    removeFromCart: async (productId) => {
		await axios.delete(`/cart`, { data: { productId } });//trong backend product routes delete dung /:id
		set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
		get().calculateTotals();
	},
    calculateTotals: async () => {
        const {cart, coupon}= get();
        const subtotal = cart.reduce((sum,item) => sum + item.price * item.quantity, 0);//tinh tong tien san pham
        let total = subtotal;// tong tien

        if(coupon) {
            const discount = subtotal * (coupon.discountPercentage / 100);// tinh tong tien giam gia
            total = subtotal - discount;// tinh tong tien sau khi giam gia
        }

        set({subtotal, total});// gan du lieu cart vao store
    },
    getMyCoupon: async () => {
		try {
			const response = await axios.get("/coupons");
			set({ coupon: response.data });
		} catch (error) {
			console.error("Error fetching coupon:", error);
		}
	},
    applyCoupon: async (code) => {
		try {
			const response = await axios.post("/coupons/validate", { code });// post trong coupon routes
			set({ coupon: response.data, isCouponApplied: true });
			get().calculateTotals();
			toast.success("Coupon applied successfully");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to apply coupon");
		}
	},
    removeCoupon: () => {
		set({ coupon: null, isCouponApplied: false });
		get().calculateTotals();
		toast.success("Coupon removed");
	},
}))