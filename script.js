let testData = fillTestData();

const storage = {
	keys: testData.keys,
	data: testData.data.map((row) => {
		const res = row.reduce((current, el, i) => {
			return {
				...current,
				[testData.keys[i]]: el
			};
		}, {});
		return res;
	}),
	statuses: testData.keys.reduce((curr, key) => {
		return {
			...curr,
			[key]: 'random'
		};
	}, {})
};

const defaultStorage = JSON.parse(JSON.stringify(storage));

function render(storages) {
	document.body.innerHTML = '';

	const table = document.createElement('table');
	const tr = document.createElement('tr');

	Object.keys(storages.statuses).forEach((element) => {
		const th = document.createElement('th');
		toogleEvent(th);
		th.innerHTML = element;
		tr.appendChild(th);
	});
	table.appendChild(tr);

	storages.data.forEach((element) => {
		const tr = document.createElement('tr');

		Object.values(element).forEach((value) => {
			const td = document.createElement('td');
			td.innerHTML = value;
			tr.appendChild(td);
		});
		table.appendChild(tr);
	});

	document.body.appendChild(table);
}

render(storage);

function toogleEvent(elem) {
	elem.onclick = (event) => {
		if (storage.statuses[elem.innerHTML] === 'random') {
			const key = elem.innerHTML;
			const status = storage.statuses[key];

			storage.data.sort((a, b) => {
				let aValue = a[key];
				let bValue = b[key];

				// console.log(key);
				if (key === 'date') {
					aValue = new Date(a[key]);
					bValue = new Date(b[key]);
				}

				if (aValue < bValue) {
					return -1;
				}

				if (aValue > bValue) {
					return 1;
				}
				return 0;
			});

			storage.statuses[elem.innerHTML] = 'up';
			document.body.innerHTML = '';
			render(storage);
		} else if (storage.statuses[elem.innerHTML] === 'up') {
			storage.data.reverse();
			storage.statuses[elem.innerHTML] = 'down';
			document.body.innerHTML = '';
			render(storage);
		} else if (storage.statuses[elem.innerHTML] === 'down') {
			storage.statuses[elem.innerHTML] = 'random';
			render(defaultStorage);
			document.body.innerHTML = '';
			render(defaultStorage);
		}
		console.log(storage);
	};
}

function fillTestData() {
	const keys = [ 'date', 'number', 'string' ];
	let data = [];
	let getRand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
	let randDate = () => new Date(Math.floor(now + Math.random() * (end_date - now))).toLocaleString();
	let getRandString = function() {
		let ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let result = '';
		for (let j = 0; j < 10; j++) {
			result += ch.charAt(Math.floor(Math.random() * ch.length));
		}
		return result;
	};
	let now = Date.now();
	let end_date = now + 86400000 * 365 * 2;
	for (let i = 0; i < 10; i++) {
		data.push([ randDate(), getRand(1111, 99999), getRandString() ]);
	}
	return {
		keys: keys,
		data: data
	};
}
