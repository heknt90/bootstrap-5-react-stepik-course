function ModalAddGood({goodTitle, goodTitleOnChange, goodPrice, goodPriceOnChange, goodsCount, goodsCountOnChange}) {
  return (
  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Добавить товар</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <label htmlFor="good_name" className="form-label">Название товара</label>
          <input type="text" className="form-control mb-3" id="good_name" maxLength={40} value={goodTitle} onChange={e => goodTitleOnChange(e.target.value)} />
          <label htmlFor="good_price" className="form-label">Цена</label>
          <input type="number" className="form-control mb-3" id="good_price" value={goodPrice} onChange={e => goodPriceOnChange(e.target.value)} />
          <label htmlFor="good_count" className="form-label">Количество</label>
          <input type="number" className="form-control mb-3" id="good_count" value={goodsCount} onChange={e => goodsCountOnChange(e.target.value)} />
          <button type="submit" className="btn btn-success">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ModalAddGood