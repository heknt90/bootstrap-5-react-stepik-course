function GoodsListTable({goods, isGoodAvailable, addToCartHandler, removeGoodHandler}) {
  const addToCartButton = (goodId) => <button className="good_ btn btn-primary" data-good={goodId} onClick={addToCartHandler}>&#10149;</button>
  const deleteGoodButton = (goodId) => <button className="good_delete btn btn-danger" data-delete={goodId} onClick={removeGoodHandler} >&#10006;</button>
  const goodsTableContent = goods.map(good => (
      <tr className="align-middle" key={good.id}>
        <td>{`${good.id+1}`}</td>
        <td className="name">{good.name}</td>
        <td className="price">{good.price}</td>
        <td>{good.count}</td>
        <td>{isGoodAvailable(good.id) ? deleteGoodButton(good.id) : ""}</td>
        <td>{isGoodAvailable(good.id) ? addToCartButton(good.id) : ""}</td>
      </tr>
    )
  )

  return (
    <div className="table-responsive">
      <table className="goods table mt-3" id="table1" hidden={goods.length ? null : "hidden"}>
        <thead>
          <tr className="table-primary align-middle">
            <th data-type="number">№</th>
            <th data-type="string">Название</th>
            <th data-type="number">Цена, &#8381;</th>
            <th data-type="number">Количество</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="list">
          {goodsTableContent}
        </tbody>
      </table>
    </div>
  )
}

export default GoodsListTable