import { HOT_LIST_CHANGE } from './actionTypes'

export const hotListChange = (hot_list) =>({
	type: HOT_LIST_CHANGE,
	hot_list
});
