export const getTotalCalories = (programItems) => {
	let totalCalories = 0;
	programItems.map((item) => {
		item.subItems.map((subItem) => {
			totalCalories += subItem.columnsValues[2];
		});
	});
	return totalCalories;
};

export const getTotalCaloriesConsumed = (programItems) => {
	let totalCaloriesConsumed = 0;
	programItems.map((item) => {
		item.subItems.map((subItem) => {
			if (subItem.done) totalCaloriesConsumed += subItem.columnsValues[2];
		});
	});
	return totalCaloriesConsumed;
};
