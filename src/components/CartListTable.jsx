function CartListTale({cartGoods, isGoodsNotEmpty, getDiscount, discountChangeHandler, calculateCartGoodPrice, removeGoodFromCartHandler}) {
  const cartTableContent = cartGoods.map(good => (
      <tr className="align-middle" key={good.id}>
        <td>{`${good.id+1}`}</td>
        <td className="price_name">{good.name}</td>
        <td className="price_one">{good.price}</td>
        <td className="price_count">{good.count}</td>
        <td className="price_discount"><input type="number" data-good={good.id} value={getDiscount(good.id)} onChange={discountChangeHandler} min="0" max="100" /></td>
        <td>{calculateCartGoodPrice(good)}</td>
        <td><button className="good_delete btn btn-danger" data-delete={good.id} onClick={removeGoodFromCartHandler} >&#10006;</button></td>
      </tr>
    )
  )

  return (
    <div className="table-responsive">
      <table className="price table mt-3" id="table2" hidden={isGoodsNotEmpty() ? null : "hidden"}>
        <thead>
          <tr className="table-primary align-middle">
            <th data-type="number">№</th>
            <th data-type="string">Название</th>
            <th data-type="number">Цена/шт., &#8381;</th>
            <th data-type="number">Количество</th>
            <th data-type="number">Скидка, %</th>
            <th data-type="number">Цена, &#8381;</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="cart">
          {cartTableContent}
        </tbody>
      </table>
    </div>
  )
}

export default CartListTale