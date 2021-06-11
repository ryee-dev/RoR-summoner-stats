const getChampionName = async (champKey: any, staticData: any) => {
  for (let i = 0; i < staticData.champions.championKeys.length; i++) {
    if (champKey.toString() === staticData.champions.championKeys[i]) {
      await staticData.champions.championNames[i].then((res) => {
        return res;
      });
    }
  }
};

const getItemName = async (itemKey: number, staticData: any) => {
  for (let i = 0; i < staticData.itemKeys.length; i++) {
    if (itemKey.toString() === staticData.itemKeys[i]) {
      await staticData.itemNames[i].then((res) => {
        return res;
      });
    }
  }
};

const getSpellName = async (spellKey: number, staticData: any) => {
  for (let i = 0; i < staticData.spells.spellKeys.length; i++) {
    if (spellKey.toString() === staticData.spells.spellKeys[i]) {
      await staticData.spells.spellNames[i].then((res) => {
        return res;
      });
    }
  }
};

const getSpellId = async (spellKey: number, staticData: any) => {
  for (let i = 0; i < staticData.spells.spellKeys.length; i++) {
    if (spellKey.toString() === staticData.spells.spellKeys[i]) {
      await staticData.spells.spellIds[i].then((res) => {
        return res;
      });
    }
  }
};

const getRuneName = async (runeId: number, staticData: any) => {
  for (let i = 0; i < staticData.runeIds.length; i++) {
    if (runeId === staticData.runeIds[i]) {
      await staticData.runeNames[i].then((res) => {
        return res;
      });
    }
  }
};

const handleConvertSecToMin = (secs: number) => {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;
  return `${minutes}m ${seconds}s`;
};

export {
  getChampionName,
  getItemName,
  getRuneName,
  getSpellName,
  getSpellId,
  handleConvertSecToMin,
};
