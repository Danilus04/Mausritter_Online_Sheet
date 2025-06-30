// src/App/ficha.jsx
import { useEffect, useRef, useState } from "react";
import api from "../apiAcess";
import Item from "../components/items/Items";
import Menu from "../components/Menu";

function ItemsDoUsuario() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [characterSheets, setCharacterSheets] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [menuData, setMenuData] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    api
      .get("/item/")
      .then((response) => {
        setItens(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar itens:", error);
        setErro("Erro ao carregar os itens.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuData && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuData(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [menuData]);

  useEffect(() => {
  if (menuData) {
    api.get('/user/characters/')
      .then(response => setCharacterSheets(response.data))
      .catch(error => console.error('Erro ao carregar fichas:', error));
  }
  }, [menuData]);
  
  const handleDelete = (item) => {
    api
      .delete(`/item/${item.idSquare}/`)
      .then(() => {
        setItens(itens.filter((i) => i.idSquare !== item.idSquare));
      })
      .catch((err) => {
        console.error("Erro ao deletar item:", err);
        alert("Erro ao deletar item.");
      });
  };

  const handleAddToCharacter = (charId, charName, item) => {
    const payload = {
      character_sheet: charId,
      item_base_id: item.idSquare,
      quantity: 1,
      currentUsageSquare: item.currentUsageSquare ?? item.maxUsageSquare ?? null,
      PositionX: null,
      PositionY: null,
    };

    api.post(`/characters/items/`, payload)
      .then(() => {
        alert(`Item adicionado à ficha ${charName}`);
        setShowDropdown(false);
        //onClose();
      })
      .catch(() => {
        alert('Erro ao adicionar item à ficha');
        setShowDropdown(false);
    });
  };


  const handleItemClick = (event, item) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuData({
      item: item,
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + rect.width / 2 + window.scrollX,
    });
  };

  const CELL_SIZE = 150;

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, ${CELL_SIZE}px)`,
    gridAutoRows: `${CELL_SIZE}px`,
    gridAutoFlow: "dense",
    gap: 0,
    width: "100%",
  };

  const getItemStyle = (item) => ({
    gridColumnEnd: `span ${item.widthSquare}`,
    gridRowEnd: `span ${item.heightSquare}`,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  });

  if (erro) return <p>{erro}</p>;
  if (loading) return <p>Carregando itens...</p>;

  return (
    <div>
      <h2>Meus Items</h2>

      <div>
        <button
          onClick={() => {
            // Cria um input de arquivo temporário e simula um clique nele
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.json'; // Aceita apenas arquivos JSON
            fileInput.onchange = async (event) => {
              const file = event.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                  try {
                    const jsonContent = JSON.parse(e.target.result);

                    // Validação básica para garantir que o JSON tem as propriedades esperadas
                    // Adapte esta validação conforme a estrutura esperada do seu JSON
                    if (!jsonContent.nameSquare || !jsonContent.widthSquare || !jsonContent.heightSquare) {
                      alert("O arquivo JSON não parece ser um item válido. Faltam propriedades essenciais.");
                      return;
                    }

                    // Prepara o payload para enviar ao backend
                    // Certifique-se de que todos os campos esperados pelo seu serializer estejam aqui
                    let payload = {
                      nameSquare: jsonContent.nameSquare || "Item sem nome",
                      widthSquare: jsonContent.widthSquare || 1,
                      heightSquare: jsonContent.heightSquare || 1,
                      descriptionSquare: jsonContent.descriptionSquare || "", // Adicione defaults se o campo pode faltar no JSON
                      effectDescription: jsonContent.effectDescription || "",
                      typeSquare: jsonContent.typeSquare || "",
                      imageSquare: jsonContent.imageSquare || null,
                      worthSquare: jsonContent.worthSquare || 0,
                      currentUsageSquare: jsonContent.currentUsageSquare || 0,
                      maxUsageSquare: jsonContent.maxUsageSquare || 0,
                      tagSquare: jsonContent.tagSquare || 0,
                      damage1Square: jsonContent.damage1Square || 0,
                      damage2Square: jsonContent.damage2Square || 0,
                      valueArmorSquare: jsonContent.valueArmorSquare || 0,
                      conditionEffectSquare: jsonContent.conditionEffectSquare || 0,
                      usageTypeSquare: jsonContent.usageTypeSquare || 0,
                      isMagical: jsonContent.isMagical || false,
                      pesoSquare: jsonContent.pesoSquare || 0,
                    };

                    try {
                      // Envia os dados para a sua API de criação de item
                      const response = await api.post("item/", payload, {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      });

                      if (response.status === 201) {
                        alert("Item importado e criado com sucesso!");
                        window.location.reload(); // Recarrega a página
                      } else {
                        alert(`Erro ao importar item: ${response.statusText || response.data}`);
                      }
                    } catch (error) {
                      console.error("Falha na comunicação com o servidor:", error);
                      alert("Falha ao conectar com o servidor ou dados inválidos.");
                    }

                  } catch (parseError) {
                    alert("Erro ao ler o arquivo JSON. Certifique-se de que é um JSON válido.");
                    console.error("Erro de parse JSON:", parseError);
                  }
                };
                reader.readAsText(file); // Lê o conteúdo do arquivo como texto
              }
            };
            fileInput.click(); // Abre a janela de seleção de arquivo
            setMenuData(null); // Fecha o menu, se aplicável
          }}
        >
          Importar Item
        </button>
      </div>
      
      <br></br>

      <div style={containerStyle}>
        {itens.length > 0 ? (
          itens.map((item) => (
            <Item
              key={item.idSquare}
              item={item}
              cellSize={CELL_SIZE}
              style={getItemStyle(item)}
              onClick={(event) => handleItemClick(event, item)}
            />
          ))
        ) : (
          <p>Nenhum item encontrado.</p>
        )}
      </div>

      {menuData && (
        <Menu ref={menuRef} top={menuData.top} left={menuData.left} onClose={() => setMenuData(null)}>
          <button onClick={() => setShowDropdown(prev => !prev)}>
            Adicionar a...
          </button>

          {showDropdown && (
            <div>
              {characterSheets.length === 0 ? (
                <div >Nenhum personagem</div>
              ) : (
                characterSheets.map((char) => (
                  <div
                    key={char.id}
                    
                    onClick={() => handleAddToCharacter(char.id, char.nameCharacter, menuData.item)}
                  >
                    {char.nameCharacter || `Ficha ${char.id}`}
                  </div>
                ))
              )}
            </div>
          )} 

          <button
            onClick={() => {
              // 1. Fecha o menu de contexto
              setMenuData(null);

              // Verifica se há dados do item para exportar
              if (menuData && menuData.item) {
                // 2. Extrai os dados do item
                const itemToExport = {
                  idSquare: menuData.item.idSquare, // Inclua o ID se for relevante para o export
                  nameSquare: menuData.item.nameSquare,
                  widthSquare: menuData.item.widthSquare,
                  heightSquare: menuData.item.heightSquare,
                  descriptionSquare: menuData.item.descriptionSquare,
                  effectDescription: menuData.item.effectDescription,
                  typeSquare: menuData.item.typeSquare,
                  imageSquare: menuData.item.imageSquare,
                  worthSquare: menuData.item.worthSquare,
                  currentUsageSquare: menuData.item.currentUsageSquare,
                  maxUsageSquare: menuData.item.maxUsageSquare,
                  tagSquare: menuData.item.tagSquare,
                  damage1Square: menuData.item.damage1Square,
                  damage2Square: menuData.item.damage2Square,
                  valueArmorSquare: menuData.item.valueArmorSquare,
                  conditionEffectSquare: menuData.item.conditionEffectSquare,
                  usageTypeSquare: menuData.item.usageTypeSquare,
                  isMagical: menuData.item.isMagical,
                  pesoSquare: menuData.item.pesoSquare,
                };

                // 3. Converte o objeto JavaScript em uma string JSON formatada
                const jsonString = JSON.stringify(itemToExport, null, 2); // 'null, 2' para formatação legível

                // 4. Cria um Blob a partir da string JSON com o tipo MIME correto
                const blob = new Blob([jsonString], { type: 'application/json' });

                // 5. Cria uma URL de objeto para o Blob
                const url = URL.createObjectURL(blob);

                // 6. Cria um link temporário para acionar o download
                const link = document.createElement('a');
                link.href = url;
                link.download = `${itemToExport.nameSquare || 'item'}.json`; // Nome do arquivo

                // 7. Simula um clique no link para iniciar o download
                document.body.appendChild(link); // Adiciona o link ao DOM (necessário para Firefox)
                link.click();

                // 8. Limpa o URL do objeto após o download
                document.body.removeChild(link); // Remove o link
                URL.revokeObjectURL(url); // Libera a URL do objeto
              } else {
                alert("Nenhum item selecionado para exportar.");
              }
            }}
          >
            Exportar
          </button>
          
          <button
            onClick={() => {
              handleDelete(menuData.item);
              setMenuData(null);
            }}
          >
            Deletar
          </button>
        </Menu>
      )}
    </div>
  );
}

export default ItemsDoUsuario;
