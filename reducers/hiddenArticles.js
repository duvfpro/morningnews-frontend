import { createSlice } from '@reduxjs/toolkit';

//Créez un reducer dans le fichier reducers/hiddenArticles.js chargé d'enregistrer les articles cachés.

const initialState = {
  value: [],
};

export const hiddenArticlesSlice = createSlice({
  name: 'hiddenArticles',
  initialState,
  reducers: {
    savedHiddenArticles : (state, action) =>{
        state.value.push(action.payload);
    },
    emptyHiddenArticles: state=> {
        state.value = []
    }
  },
});

export const {savedHiddenArticles,emptyHiddenArticles} = hiddenArticlesSlice.actions;
export default hiddenArticlesSlice.reducer;