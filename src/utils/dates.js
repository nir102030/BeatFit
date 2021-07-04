export const getDayOfWeekHeb = (day) => {
	switch (day) {
		case 0:
			return "ראשון";
		case 1:
			return "שני";
		case 2:
			return "שלישי";
		case 3:
			return "רביעי";
		case 4:
			return "חמישי";
		case 5:
			return "שישי";
		case 6:
			return "שבת";
	}
};

export const getDayOfWeekInLettersHeb = (day) => {
	switch (day) {
		case 0:
			return "א'";
		case 1:
			return "ב'";
		case 2:
			return "ג'";
		case 3:
			return "ד'";
		case 4:
			return "ה'";
		case 5:
			return "ו'";
		case 6:
			return "ש'";
	}
};
