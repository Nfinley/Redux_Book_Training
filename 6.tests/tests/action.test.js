import * as actions from 'actions/recipes';
import { SET_RECIPE } from 'consts';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mockFetch, mockFetchError } from 'test-utils';

const mockStore = configureStore([ thunk ]);

describe('actions', () => {
  it('should create an action to add a recipe with snapshot', () => {
    expect(actions.addRecipe('test')).toMatchSnapshot();
  });

  [undefined, null, ''].forEach(param =>
    it('should add recipe with default parameter' , () => {
      expect(actions.addRecipe(param)).toMatchSnapshot()
    }));

  it('should create an action to add a recipe with trimmed title', () => {
    expect(actions.addRecipe(' trimmed ')).toMatchSnapshot();
  });

  it('should create an action to delete a todo', () => {
    expect(actions.delRecipe('test')).toMatchSnapshot();
  });

  it('should create an action to set recipes', () => {
    expect(actions.setRecipes([1, 2, 3])).toMatchSnapshot();
  });

  describe('fetch recipe', () => {
    let store;
    beforeEach(() => store = mockStore({}));

    it('should fetch recipe if exists', () => {
      mockFetch('recipe/100', 200, '{"title":"hello"}');

      return store.dispatch(actions.fetchRecipe(100))
        .then(() => expect(store.getActions()).toMatchSnapshot())
    });

    it('should fail if recipe not found', () => {
      mockFetchError('recipe/100', 404, 'Not found');

      return store.dispatch(actions.fetchRecipe(100))
        .then(() => expect(store.getActions()).toMatchSnapshot())
    });
  });
});

