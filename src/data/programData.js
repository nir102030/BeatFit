import moment from "moment";
import { getImage } from "../api/appApi";

const programs = {
	training: {
		minRate: 0.7,
		startDate: moment(),
		endDate: moment().add(3, "months"),
		period: { unit: "months", value: 3 },
		frequancy: { unit: "week", value: 3 },
		days: [0, 2, 4],
		completedRate: 0,
		dailysPrograms: [
			{
				date: new Date().toJSON().substring(0, 10),
				KPIs: [],
				category: "סט",
				columnsTitles: ["חזרות", "משקל"],
				total: 9,
				completed: 0,
				blocked: false,
				finished: false,
				items: [
					{
						title: "שכיבות שמיכה",
						image: getImage("pushups"),
						subItems: [
							{
								name: "1",
								done: false,
								columnsValues: ["15", "0"],
							},
							{
								name: "2",
								done: false,
								columnsValues: ["15", "0"],
							},
							{
								name: "3",
								done: false,
								columnsValues: ["15", "0"],
							},
						],
					},
					{
						title: "סקאוט",
						image: getImage("squat"),
						subItems: [
							{
								name: "1",
								done: false,
								columnsValues: ["15", "5"],
							},
							{
								name: "2",
								done: false,
								columnsValues: ["15", "5"],
							},
							{
								name: "3",
								done: false,
								columnsValues: ["15", "5"],
							},
						],
					},
					{
						title: "פלאנק",
						image: getImage("plank"),
						subItems: [
							{
								name: "1",
								done: false,
								columnsValues: ["15", "0"],
							},
							{
								name: "2",
								done: false,
								columnsValues: ["15", "0"],
							},
							{
								name: "3",
								done: false,
								columnsValues: ["15", "0"],
							},
						],
					},
				],
			},
		],
	},
	nutrition: {
		minRate: 0.7,
		startDate: moment(),
		endDate: moment().add(2, "months"),
		completedRate: 0,
		dailysPrograms: [
			{
				date: new Date().toJSON().substring(0, 10),
				KPIs: [],
				category: "מאכל",
				columnsTitles: ["כמות", "יח", "קלוריות"],
				total: 950,
				completed: 0,
				blocked: true,
				finished: false,
				items: [
					{
						title: "ארוחת בוקר",
						image: getImage("breakfast"),
						subItems: [
							{
								name: "לחם",
								done: false,
								columnsValues: [2, "פרוסה", 100],
							},
							{
								name: "ביצה",
								done: false,
								columnsValues: [2, "יח", 100],
							},
							{
								name: "גבינה לבנה",
								done: false,
								columnsValues: [1, "כף", 50],
							},
						],
					},
					{
						title: "ארוחת צהריים",
						image: getImage("lunch"),
						subItems: [
							{
								name: "אורז",
								done: false,
								columnsValues: [1 / 2, "כף", 150],
							},
							{
								name: "חזה עוף",
								done: false,
								columnsValues: [200, "גר", 250],
							},
							{
								name: "טחינה",
								done: false,
								columnsValues: [1, "כף", 100],
							},
						],
					},
					{
						title: "ארוחת ערב",
						image: getImage("dinner"),
						subItems: [
							{
								name: "לחם",
								done: false,
								columnsValues: [1, "פרוסה", 50],
							},
							{
								name: "קוטג",
								done: false,
								columnsValues: [3, "כף", 50],
							},
							{
								name: "סלט",
								done: false,
								columnsValues: [1, "כוס", 100],
							},
						],
					},
				],
			},
		],
	},
};

export const getPrograms = () => {
	return programs;
};
