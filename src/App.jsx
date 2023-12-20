import { useEffect, useRef, useState } from "react";
import { Modal } from 'bootstrap'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import './App.css';
import ModalAddGood from "./components/ModalAddGood/ModalAddGood";
import MenuSearchAndCreateGood from "./components/MenuSearchAndCreateGood/MenuSearchAndCreateGood";
import TotalPriceMenu from "./components/TotalPriceMenu/TotalPriceMenu";
import GoodsListTable from "./components/GoodsListTable/GoodsListTable";
import CartListTale from "./components/CartListTable";
import { getOrInitializeLocalStorageItem, saveItemToLocalStorage } from "./utils/localStorageUtilities"

const mySwal = withReactContent(Swal)

function App() {
  const [newGoodTitle, setNewGoodTitle] = useState("")
  const [newGoodPrice, setNewGoodPrice] = useState(0)
  const [newGoodsCount, setNewGoodsCount] = useState(1)
  const [searchInputText, setSearchInputText] = useState("")
  const [goods, setGoods] = useState([])
  const [cartGoods, setCartGoods] = useState([])
  const newGoodRef = useRef(null)
  const goodsTableRef = useRef(null)
  
  useEffect(() => {
    setGoods(getOrInitializeLocalStorageItem("goods", []))
  }, [])
  
  useEffect(() => {
    if (!searchInputText) {
      saveItemToLocalStorage("goods", goods)
    }
  }, [goods, searchInputText])

  function setSearchInputOnChange(event) {
    const inputValue = event.target.value
    setSearchInputText(inputValue)
  }

  function filterGoodsList() {
    const condition = new RegExp(searchInputText, 'i')
    const newGoods = goods.filter(good => condition.test(good.name) || condition.test(good.price))
    return newGoods
  }

  const createNewGoodHandler = () => {
    const modal = new Modal(newGoodRef.current)
    modal.show()
  }

  const goodSaveHandler = () => {
    if (newGoodTitle && newGoodsCount) {
      setNewGoodTitle("")
      setNewGoodPrice(0)
      setNewGoodsCount(1)
      setGoods(prev => [...prev, {id: prev.length, name: newGoodTitle, price: newGoodPrice, count: newGoodsCount}])
      const modal = Modal.getInstance(newGoodRef.current)
      modal.hide()
    } else {
      mySwal.fire({
        icon: "error",
        title: "Ошибка",
        text: "Пожалуйста, заполните все поля!"
      })
    }
  } 
  
  const isGoodAvailable = (goodId) => {
    const candidate = goods.find(good => good.id === goodId)
    return (candidate && candidate.count > 0)
  }
  const isGoodInCart = (goodId) => !!cartGoods.find(good => good.id === goodId)
  const isGoodsNotEmpty = () => !!goods.length

  function removeGoodHandler(event) {
    const deleteIndex = parseInt(event.target.dataset.delete)
    const goodCount = goods.find(good => good.id === deleteIndex).count
    if (goodCount > 1 || isGoodInCart(deleteIndex)) {
      setGoods(decrementItemCount(deleteIndex, goods))
    } else {
      Swal.fire({
        title: "Внимание!",
        text: "Вы действительно хотите удалить товар?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Да",
        cancelButtonText: "Отмена"
      })
        .then(result => {
          if (result.isConfirmed) {
            const newGoods = goods.filter(el => el.id !== deleteIndex)
            return newGoods
          }
        })
        .then(result => {
          if (result) {
            setGoods(result)
          }
        })
    }    
  }

  function removeGoodFromCartHandler(event) {
    const deleteIndex = parseInt(event.target.dataset.delete)
    const good = cartGoods.find(good => good.id === deleteIndex)
    if (good && good.count > 1) {
      setCartGoods(decrementItemCount(deleteIndex, cartGoods))
    } else {
      setCartGoods(deleteListItem(deleteIndex, cartGoods))
    }
    setGoods(incrementItemCount(deleteIndex, goods))
  }

  function addToCartHandler(event) {
    const goodId = parseInt(event.target.dataset.good)
    setGoods(decrementItemCount(goodId, goods))
    const candidate = cartGoods.find(good => good.id === goodId)
    if (candidate) {
      incrementItemCount(goodId, cartGoods)
    } else {
      const newGood = {...goods.find(good => good.id === goodId)}
      newGood.count = 1
      newGood.discount = 0
      setCartGoods(prev => [...prev, newGood])
    }
  }

  function incrementItemCount(goodId, list) {
    return changeItemCount(1, goodId, list)
  }

  function decrementItemCount(goodId, list) {
    return changeItemCount(-1, goodId, list)
  }

  function changeItemCount(diff, goodId, list) {
    return list.map(good => {
      if (good.id === goodId) {
        good.count += diff
      }
      return good
    })
  }

  function getDiscount(goodId) {
    return (cartGoods.find(good => good.id === goodId)).discount
  }

  function discountChangeHandler(event) {
    const goodId = parseInt(event.target.dataset.good)
    const newValue = parseInt(event.target.value)
    setCartGoods(cartGoods.map(good => {
      if (good.id === goodId) {
        good.discount = newValue
      }
      return good
    }))
  }

  function deleteListItem(goodId, list) {
    return list.filter(el => el.id !== goodId)
  }

  function calculateCartGoodPrice(good) {
    return good.count*good.price - good.count*good.price*good.discount*.01
  }

  function calculateCartTotalPrice() {
    let result = 0
    cartGoods.forEach(good => {
      result += calculateCartGoodPrice(good)
    })
    return result
  }

  return (
    <div className="App container">
      <div className="row">
        <div className="col-xs-12 col-xxl-5">
          <div className="goods_box" id="goods" ref={goodsTableRef}>
            <MenuSearchAndCreateGood createNewGoodHandler={createNewGoodHandler} searchInputText={searchInputText} searchInputOnChange={setSearchInputOnChange} />
            <GoodsListTable goods={filterGoodsList()} isGoodAvailable={isGoodAvailable} isGoodsNotEmpty={isGoodsNotEmpty} addToCartHandler={addToCartHandler} removeGoodHandler={removeGoodHandler} />
          </div>
        </div>
        <div className="col-xs-12 col-xxl-7">
          <div className="price_box">
            <TotalPriceMenu totalPrice={calculateCartTotalPrice()} />
            <CartListTale cartGoods={cartGoods} isGoodsNotEmpty={isGoodsNotEmpty} getDiscount={getDiscount} discountChangeHandler={discountChangeHandler} calculateCartGoodPrice={calculateCartGoodPrice} removeGoodFromCartHandler={removeGoodFromCartHandler} />
          </div>
        </div>
      </div>
      <ModalAddGood newGoodRef={newGoodRef} goodSaveHandler={goodSaveHandler} goodTitle={newGoodTitle} goodTitleOnChange={setNewGoodTitle} goodPrice={newGoodPrice} goodPriceOnChange={setNewGoodPrice} goodsCount={newGoodsCount} goodsCountOnChange={value => setNewGoodsCount(parseInt(value))} />
    </div>
  );
}

export default App;
