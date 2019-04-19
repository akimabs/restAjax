$(() => {
	// READ / GET
	$('#get-button').on('click', () => {
		// event.preventDefault();

		$.ajax({
			url: '/data',
			contentType: 'application/json',
			success: (response) => {
				let tBodyEl = $('tbody');

				tBodyEl.html('');

				response.data.forEach((dataku) => {
					tBodyEl.append(
						'\
                    <tr>\
                    <td class="id p-3" id="id">' +
							dataku.id +
							'</td>\
                    <td><input type="text" class="name form-control mb-5" id="nama" value="' +
							dataku.nama +
							'"></td>\
                    <td class="nim p-3" id="nim">' +
							dataku.nim +
							'</td>\
                    <td>\
                    <button class="btn btn-danger delete">Delete</button>\
                    <button class="btn btn-success edit">Edit</button>\
					</td>\
                    </tr>\
                    '
					);
				});

				// edit
				$('.edit').click(function() {
					let rowEl = $(this).closest('tr');
					let id = rowEl.find('.id').text();
					let newName = rowEl.find('.name').val();

					console.log(id);

					$.ajax({
						url: '/data/' + id,
						method: 'PUT',
						contentType: 'application/json',
						data: JSON.stringify({ newName: newName }),
						success: (response) => {
							console.log(response);
							$('#get-button').click();
							alert('Succesfully edit data');
						}
					});
				});

				// delete
				$('.delete').click(function() {
					let rowEl = $(this).closest('tr');
					let id = rowEl.find('.id').text();
					console.log(id);
					$.ajax({
						url: '/data/' + id,
						method: 'DELETE',
						contentType: 'application/json',
						success: (response) => {
							console.log(response);
							$('#get-button').click();
						}
					});
				});
			}
		});
	});

	// Create / Post
	$('#create-data').on('click', (event) => {
		event.preventDefault();
		let inputNama = $('#input-nama');
		let inputNim = $('#input-nim');

		$.ajax({
			url: '/data',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				name: inputNama.val(),
				nim: inputNim.val()
			}),
			success: (response) => {
				console.log(response);
				inputNama.val('');
				inputNim.val('');
				$('#get-button').click();
			}
		});
	});
});
