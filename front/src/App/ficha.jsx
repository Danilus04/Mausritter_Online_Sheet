// src/App/ficha.jsx
import { useEffect, useState } from 'react'
import api from '../apiAcess'
import Item from '../components/items'


function Ficha() {
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    api.get('/item/')
      .then(response => {
        setItens(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Erro ao buscar itens:", error)
        setErro("Erro ao carregar os itens.")
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Carregando itens...</p>
  if (erro) return <p>{erro}</p>

  return (
    <div>
      <h2>Itens da Ficha</h2>
      {itens.length === 0 ? (
        <p>Nenhum item encontrado.</p>
      ) : (
        itens.map(item => <Item key={item.idSquare} item={item} cellSize={150}/>)
      )}
    </div>
  )
}

export default Ficha
