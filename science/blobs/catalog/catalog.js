$(document).ready(function() {
    // Path to your JSON data file
    var dataFile = '../../../data/lyman_alpha_blobs.json';

    $.getJSON(dataFile, function(data) {
        var tableBody = $('#catalogTable tbody');

        // Loop through each object in the data
        $.each(data, function(index, obj) {
            var row = '<tr>';

            row += '<td>' + obj.object_name + '</td>';
            row += '<td>' + obj.field_name + '</td>';
            row += '<td>' + (obj.ra !== null && obj.ra !== undefined ? obj.ra.toFixed(5) : 'N/A') + '</td>';
            row += '<td>' + (obj.dec !== null && obj.dec !== undefined ? obj.dec.toFixed(5) : 'N/A') + '</td>';
            row += '<td>' + (obj.magnitude_G !== null && obj.magnitude_G !== undefined ? obj.magnitude_G : 'N/A') + '</td>';
            row += '<td>' + (obj.magnitude_R !== null && obj.magnitude_R !== undefined ? obj.magnitude_R : 'N/A') + '</td>';
            row += '<td>' + (obj.magnitude_I !== null && obj.magnitude_I !== undefined ? obj.magnitude_I : 'N/A') + '</td>';
            row += '<td>' + (obj.redshift !== null && obj.redshift !== undefined ? obj.redshift : 'N/A') + '</td>';
            row += '<td>' + (obj.luminosity !== null && obj.luminosity !== undefined ? obj.luminosity.toExponential(2) : 'N/A') + '</td>';
            row += '<td>' + (obj.equivalent_width !== null && obj.equivalent_width !== undefined ? obj.equivalent_width : 'N/A') + '</td>';

            // Display the compiled image with a modal
            row += '<td>';
            if (obj.image_filename) {
                row += '<a href="#" data-toggle="modal" data-target="#imageModal' + index + '">';
                row += '<img src="../../../' + obj.image_filename + '" alt="' + obj.object_name + '" class="img-thumbnail" width="150">';
                row += '</a>';

                // Modal structure
                row += '<div class="modal fade" id="imageModal' + index + '" tabindex="-1" role="dialog" aria-labelledby="modalLabel' + index + '" aria-hidden="true">';
                row += '  <div class="modal-dialog modal-lg" role="document">';
                row += '    <div class="modal-content">';
                row += '      <div class="modal-header">';
                row += '        <h5 class="modal-title" id="modalLabel' + index + '">' + obj.object_name + '</h5>';
                row += '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
                row += '          <span aria-hidden="true">&times;</span>';
                row += '        </button>';
                row += '      </div>';
                row += '      <div class="modal-body text-center">';
                row += '        <img src="../../../' + obj.image_filename + '" alt="' + obj.object_name + '" class="img-fluid">';
                row += '      </div>';
                row += '    </div>';
                row += '  </div>';
                row += '</div>';

            } else {
                row += 'No image available';
            }
            row += '</td>';

            // Download links
            row += '<td>';
            var hasDownload = false;
            if (obj.image_data_filename) {
                row += '<a href="../../../' + obj.image_data_filename + '" download>Image Data (.npy)</a><br>';
                hasDownload = true;
            }
            if (obj.spectra_data_filename) {
                row += '<a href="../../../' + obj.spectra_data_filename + '" download>Spectra Data (.txt)</a>';
                hasDownload = true;
            }
            if (!hasDownload) {
                row += 'No data available';
            }
            row += '</td>';

            row += '</tr>';

            tableBody.append(row);
        });

        // Initialize DataTables after data is loaded and appended
        $('#catalogTable').DataTable({
            "paging": true,
            "searching": true,
            "ordering": true
        });
    });
});
