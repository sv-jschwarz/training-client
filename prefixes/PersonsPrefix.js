const { nullToUndefined, query } = require('@simpleview/sv-graphql-client');

class PersonsPrefix {
	constructor({ graphUrl, graphServer }) {
		this.name = 'persons';
		this._graphUrl = graphUrl;
		this._graphServer = graphServer;
	}

	async find({ fields, context, filter, headers }) {
		const variables = {
			filter
		};

		const result = await query({
			query : `
				query ($filter: training_persons_find_input) {
					training {
						persons_find(filter: $filter) {
							${fields}
						}
					}
				}
			`,
			variables,
			url : this._graphUrl,
			headers
		});

		nullToUndefined(result);

		return result.training.persons_find;
	}

	async insert({ fields, context, input, headers }) {
		const variables = {
			input
		};

		const result = await query({
			query : `
				mutation ($input: [training_persons_insert_input!]!) {
					training {
						persons_insert(input: $input) {
							${fields}
						}
					}
				}
			`,
			variables,
			url : this._graphUrl,
			headers
		});

		nullToUndefined(result);

		return result.training.persons_insert;
	}

	async remove({ fields, context, input, headers }) {
		const variables = {
			input
		};

		const result = await query({
			query : `
				mutation ($input: training_persons_remove_input) {
					training {
						persons_remove(input: $input) {
							${fields}
						}
					}
				}
			`,
			variables,
			url : this._graphUrl,
			headers
		});

		nullToUndefined(result);

		return result.training.persons_remove;
	}
}

module.exports = PersonsPrefix;