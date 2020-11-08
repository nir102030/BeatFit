import moment from 'moment';

const user = {
	id: 1,
	userName: 'nir102030',
	password: 'nir102030',
	email: 'nir102030@gmail.com',
	profilePhoto: '',
	measures: {
		weight: 80,
		height: 180,
		age: 28,
	},
	programs: [
		{
			type: 'trainings',
			minRate: 0.7,
			startDate: moment(),
			endDate: moment().add(3,'months'),
			period: {unit:'months',value:3},
			frequancy: {unit:'week', value:3},
			days: [0,2,4],
			dailysPrograms: [
				{
					date: new Date().toJSON().substring(0, 10),
					KPIs: [],
					category: 'סט',
					columnsTitles: ['חזרות', 'משקל'],
					total:0,
					completed:0,
					items: [
						{
							title: 'שכיבות שמיכה',
							image: require('../assets/pushups.jpg'),
							subItems: [
								{
									name: '1',
									done: true,
									columnsValues: ['15', '0'],
								},
								{
									name: '2',
									done: false,
									columnsValues: ['15', '0'],
								},
								{
									name: '3',
									done: false,
									columnsValues: ['15', '0'],
								},
							],
						},
						{
							title: 'סקאוט',
							image: require('../assets/squat.jpg'),
							subItems: [
								{
									name: '1',
									done: true,
									columnsValues: ['15', '5'],
								},
								{
									name: '2',
									done: false,
									columnsValues: ['15', '5'],
								},
								{
									name: '3',
									done: false,
									columnsValues: ['15', '5'],
								},
							],
						},
						{
							title: 'פלאנק',
							image: require('../assets/plank.jpg'),
							subItems: [
								{
									name: '1',
									done: true,
									columnsValues: ['15', '0'],
								},
								{
									name: '2',
									done: false,
									columnsValues: ['15', '0'],
								},
								{
									name: '3',
									done: false,
									columnsValues: ['15', '0'],
								},
							],
						},
					],
				},
				{
					date: '2020-10-12',
					KPIs: [],
					category: 'סט',
					columnsTitles: ['חזרות', 'משקל'],
					total:0,
					completed:0,
					items: [
						{
							title: 'שכיבות שמיכה',
							image: require('../assets/pushups.jpg'),
							subItems: [
								{
									name: '1',
									done: true,
									columnsValues: ['15', '0'],
								},
								{
									name: '2',
									done: false,
									columnsValues: ['15', '0'],
								},
								{
									name: '3',
									done: false,
									columnsValues: ['15', '0'],
								},
							],
						},
						{
							title: 'סקאוט',
							image: require('../assets/squat.jpg'),
							subItems: [
								{
									name: '1',
									done: true,
									columnsValues: ['15', '5'],
								},
								{
									name: '2',
									done: false,
									columnsValues: ['15', '5'],
								},
								{
									name: '3',
									done: false,
									columnsValues: ['15', '5'],
								},
							],
						},
						{
							title: 'פלאנק',
							image: require('../assets/plank.jpg'),
							subItems: [
								{
									name: '1',
									done: true,
									columnsValues: ['15', '0'],
								},
								{
									name: '2',
									done: false,
									columnsValues: ['15', '0'],
								},
								{
									name: '3',
									done: false,
									columnsValues: ['15', '0'],
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'nutrition',
			minRate: 0.7,
			dailysPrograms: [
				{
					date: new Date().toJSON().substring(0, 10),
					KPIs: [],
					category: 'מאכל',
					columnsTitles: ['כמות', 'יח', 'קלוריות'],
					total:0,
					completed:0,
					items: [
						{
							title: 'ארוחת בוקר',
							image: require('../assets/breakfast.jpg'),
							subItems: [
								{
									name: 'לחם',
									done: true,
									columnsValues: [2, 'פרוסה', 100],
								},
								{
									name: 'ביצה',
									done: false,
									columnsValues: [2, 'יח', 100],
								},
								{
									name: 'גבינה לבנה',
									done: false,
									columnsValues: [1, 'כף', 50],
								},
							],
						},
						{
							title: 'ארוחת צהריים',
							image: require('../assets/lunch.jpg'),
							subItems: [
								{
									name: 'אורז',
									done: true,
									columnsValues: [1 / 2, 'כף', 150],
								},
								{
									name: 'חזה עוף',
									done: false,
									columnsValues: [200, 'גר', 250],
								},
								{
									name: 'טחינה',
									done: false,
									columnsValues: [1, 'כף', 100],
								},
							],
						},
						{
							title: 'ארוחת ערב',
							image: require('../assets/dinner.jpg'),
							subItems: [
								{
									name: 'לחם',
									done: true,
									columnsValues: [1, 'פרוסה', 50],
								},
								{
									name: 'קוטג',
									done: false,
									columnsValues: [3, 'כף', 50],
								},
								{
									name: 'סלט',
									done: false,
									columnsValues: [1, 'כוס', 100],
								},
							],
						},
					],
				},
				{
					date: '2020-10-12',
					KPIs: [],
					category: 'מאכל',
					columnsTitles: ['כמות', 'יח', 'קלוריות'],
					total:0,
					completed:0,
					items: [
						{
							title: 'ארוחת בוקר',
							image: require('../assets/breakfast.jpg'),
							subItems: [
								{
									name: 'לחם',
									done: true,
									columnsValues: [2, 'פרוסה', 100],
								},
								{
									name: 'ביצה',
									done: false,
									columnsValues: [2, 'יח', 100],
								},
								{
									name: 'גבינה לבנה',
									done: false,
									columnsValues: [1, 'כף', 50],
								},
							],
						},
						{
							title: 'ארוחת צהריים',
							image: require('../assets/lunch.jpg'),
							subItems: [
								{
									name: 'אורז',
									done: true,
									columnsValues: [1 / 2, 'כף', 150],
								},
								{
									name: 'חזה עוף',
									done: false,
									columnsValues: [200, 'גר', 250],
								},
								{
									name: 'טחינה',
									done: false,
									columnsValues: [1, 'כף', 100],
								},
							],
						},
						{
							title: 'ארוחת ערב',
							image: require('../assets/dinner.jpg'),
							subItems: [
								{
									name: 'לחם',
									done: true,
									columnsValues: [1, 'פרוסה', 50],
								},
								{
									name: 'קוטג',
									done: false,
									columnsValues: [3, 'כף', 50],
								},
								{
									name: 'סלט',
									done: false,
									columnsValues: [1, 'כוס', 100],
								},
							],
						},
					],
				},
			],
		},
	],
};

export default getUser = () => {
	return user;
};
