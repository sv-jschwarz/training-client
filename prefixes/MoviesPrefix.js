const { nullToUndefined, query } = require('@simpleview/sv-graphql-client');

class MoviesPrefix {
	constructor({ graphUrl, graphServer }) {
		this.name = 'movies';
		this._graphUrl = graphUrl;
		this._graphServer = graphServer;
	}

	async find({ fields, context, filter, headers }) {
		const variables = {
			filter
		};

		const result = await query({
			query : `
				query ($filter: training_movies_find_input) {
					training {
						movies_find(filter: $filter) {
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

		return result.training.movies_find;
	}

	async insert({ fields, context, input, headers }) {
		const variables = {
			input
		};

		const result = await query({
			query : `
				mutation ($input: [training_movies_insert_input!]!) {
					training {
						movies_insert(input: $input) {
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

		return result.training.movies_insert;
	}

	async remove({ fields, context, input, headers }) {
		const variables = {
			input
		};

		const result = await query({
			query : `
				mutation ($input: training_movies_remove_input) {
					training {
						movies_remove(input: $input) {
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

		return result.training.movies_remove;
	}

	async reset_test_data({ fields, context, input, headers }) {
		const result = await query({
			query : `
				mutation {
					training {
						reset_test_data {
							${fields}
						}
					}
				}
			`,
			url : this._graphUrl,
			headers
		});

		nullToUndefined(result);

		return result.training.reset_test_data;
	}
}

module.exports = MoviesPrefix;