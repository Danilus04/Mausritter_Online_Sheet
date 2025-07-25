// src/App/ItensDefault.jsx

import { useEffect, useRef, useState } from "react";
import api from "../apiAcess";
import Item from "../components/items/Items";
import Menu from "../components/Menu";
import Title from "../components/ui/Title";

function ItensDefault() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const [menuData, setMenuData] = useState(null);
  const menuRef = useRef(null);

  const handleDragStart = (e, item) => {};
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, item) => {};
  const handleDragEnd = () => {};

  useEffect(() => {
    // Array com os nomes dos arquivos que queremos buscar
    const filesToFetch = [
      "/ItensDefault/armor.db",
      "/ItensDefault/conditions.db",
      "/ItensDefault/gear.db",
      "/ItensDefault/spells.db",
      "/ItensDefault/weapons.db",
    ];

    // Função para processar o conteúdo de um arquivo
    const processFileData = (textData) => {
      const lines = textData.split("\n").filter((line) => line.trim() !== "");
      return lines.map((line) => {
        const d = JSON.parse(line);
        const prefixoIncorreto = "systems/mausritter/images/icons/";
        let caminhoCorrigido = null;
        let path = null;

        if (d.img && typeof d.img === "string") {
          caminhoCorrigido = d.img.replace(prefixoIncorreto, "");
          path = "ItensDefault/" + caminhoCorrigido;
        }

        return {
          // Adicionamos um ID único baseado no nome e tipo, para evitar problemas na renderização
          idSquare: `${d.type}-${d.name}`,
          nameSquare: d.name || "Item sem nome",
          widthSquare: d.data?.size?.width || 1,
          heightSquare: d.data?.size?.height || 1,
          descriptionSquare: d.data?.description || "",
          effectDescription: d.effects || "",
          typeSquare: d.type || "",
          imageSquare: path || null,
          worthSquare: d.data?.cost || 0,
          currentUsageSquare: d.data?.pips?.value || 0,
          maxUsageSquare: d.data?.pips?.max || 0,
          tagSquare: d.data?.tag || 0,
          damage1Square: d.data?.weapon?.dmg1 || 0,
          damage2Square: d.data?.weapon?.dmg2 || 0,
          valueArmorSquare: d.data?.armor?.value || 0,
          conditionEffectSquare: d.data?.desc || 0,
          usageTypeSquare: d.data?.clear || 0,
          isMagical: d.data?.isSpell || false,
          pesoSquare: d.data?.weight || 0,
        };
      });
    };

    // Usamos Promise.all para buscar todos os arquivos em paralelo
    Promise.all(
      filesToFetch.map((file) =>
        fetch(file).then((response) => {
          if (!response.ok) {
            throw new Error(`Não foi possível encontrar o arquivo ${file}`);
          }
          return response.text();
        })
      )
    )
      .then((allFilesTextData) => {
        // O 'allFilesTextData' é um array com o conteúdo de cada arquivo
        // Processamos cada um e unificamos os resultados
        const allItems = allFilesTextData.flatMap((textData) => processFileData(textData));
        setItens(allItems);
      })
      .catch((error) => {
        console.error("Erro ao buscar ou processar os arquivos de itens:", error);
        setErro("Erro ao carregar os itens.");
      })
      .finally(() => {
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

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuData]);

  // Função chamada quando um item é clicado
  const handleItemClick = (event, item) => {
    event.stopPropagation();

    const rect = event.currentTarget.getBoundingClientRect();

    // O menu aparecerá abaixo e CENTRALIZADO com o item.
    setMenuData({
      item: item,
      top: rect.bottom + window.scrollY + 5, // Posição vertical abaixo do item
      left: rect.left + rect.width / 2 + window.scrollX, // Posição horizontal no centro do item
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
      <Title>Itens Da Ficha</Title>
      <div style={containerStyle}>
        {itens.length > 0 ? (
          itens.map((item) => (
            <Item
              key={item.idSquare}
              item={item}
              cellSize={150}
              style={getItemStyle(item)}
              onDragStart={(e) => handleDragStart(e, item)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item)}
              onDragEnd={handleDragEnd}
              onClick={(event) => handleItemClick(event, item)}
            />
          ))
        ) : (
          <p>Nenhum item encontrado.</p>
        )}
      </div>

      {menuData && (
        <Menu ref={menuRef} top={menuData.top} left={menuData.left} onClose={() => setMenuData(null)}>
          <button
            onClick={async () => {
              let payload = {
                nameSquare: menuData.item.nameSquare,
                widthSquare: menuData.item.widthSquare,
                heightSquare: menuData.item.heightSquare,
                descriptionSquare: menuData.item.descriptionSquare,
                effectDescription: menuData.item.effectDescription.join(", "),
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

              try {
                const response = await api.post("item/", payload, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                });

                if (response.status === 201) {
                  //alert("Item importado com sucesso!");
                } else {
                  alert(`Erro ao criar item: ${response.statusText}`);
                }
              } catch (error) {
                console.error("Falha na comunicação com o servidor:", error);
                alert("Falha ao conectar com o servidor.");
              }

              //onClose();
            }}
          >
            Import
          </button>
        </Menu>
      )}
    </div>
  );
}

export default ItensDefault;
