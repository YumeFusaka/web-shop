import {defineStore} from 'pinia'
import {ref,computed} from 'vue'
import { useUserStore } from './userStore'
import {insertCartAPI,findNewCartListAPI,delCartAPI} from '@/apis/cart'

export const useCartStore = defineStore('cart',()=>{
  const userStore = useUserStore()
  const isLogin = computed(()=>userStore.userInfo.token)
  const cartList =ref([])

  const updateCartList = async()=>{
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }


  const addCart = async(goods) =>{
    const {skuId,count} = goods
    if(isLogin.value){
      await insertCartAPI({skuId,count})
      await updateCartList()
    }else{
      const item = cartList.value.find((item)=>goods.skuId === item.skuId)
      if(item){
        item.count++
      }else{
        cartList.value.push(goods)
      }
    }
  }
  const delCart = async(skuId)=>{
    if(isLogin.value){
      delCartAPI([skuId])
      await updateCartList()
    }else{
      const idx = cartList.value.findIndex((item)=>skuId ===item.skuId)
      cartList.value.splice(idx,1)
    }
  }

  const singleCheck = (skuId,selected)=>{
    const item = cartList.value.find((item)=>skuId === item.skuId)
    item.selected = selected
  }

  const allCount = computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))
  const allPrice = computed(()=>cartList.value.reduce((a,c)=>a+c.count * c.price,0))

  const isAll = computed(()=>cartList.value.every((item)=>item.selected))
  const allCheck = (selected)=>{
    cartList.value.forEach((item)=>item.selected = selected)
  }

  const clearCart = ()=>{
    cartList.value = []
  }

  const selectedCount = computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count,0))
  const selectedPrice = computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count*c.price,0))

  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    clearCart,
    updateCartList
  }
},{
  persist: true
})