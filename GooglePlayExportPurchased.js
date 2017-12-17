allResults = []
$('.id-my-account-purchase-table.my-account-list-table').find('tr').each(function() {
	thisResult = {};
	thisName = $(this).find('.my-account-purchase-col.my-account-purchase-name').find('.id-purchase-document-details').text().trim();
	if (thisName) {
		thisUrl = 'https://play.google.com' + $(this).find('.my-account-purchase-col.my-account-purchase-name a').attr('href');
		thisDate = $(this).find('.my-account-purchase-col.my-account-purchase-date').text().trim();
		thisPrice = $(this).find('.my-account-purchase-col.my-account-purchase-price').text().trim();
		thisCategories = $(this).find('.my-account-purchase-col.my-account-purchase-cat.my-account-contains-text-link').find('div').map(function() {
			return $(this).text().trim();
		}).get();
		thisResult['name'] = thisName;
		thisResult['url'] = thisUrl;
		thisResult['date'] = thisDate; //Date.parse(thisDate);													
		thisResult['price'] = thisPrice;
		thisResult['type'] = thisCategories.shift();
		thisResult['category'] = thisCategories.join("+");

		thisResult['status'] = 'Paid'
		isCanceled = $(this).find('.my-account-history-canceled').text().trim();
		if (isCanceled) {
			thisResult['status'] = 'Cancelled';
		}
		allResults.push(thisResult);
	}
})
console.log(allResults);
csv = "";
csv += "Name;URL;Date;Price;Type;Category;Status\n";
for (i_result = 0; i_result < allResults.length; i_result++) {
	csv += allResults[i_result]['name'] + ";" + allResults[i_result]['url'] + ";" + allResults[i_result]['date'] + ";" + allResults[i_result]['price'] + ";" + allResults[i_result]['type'] + ";" + allResults[i_result]['category'] + ";" + allResults[i_result]['status'];
	if (i_result < allResults.length) {
		csv += "\n"
	}
}
console.log(csv);

if (!csv.match(/^data:text\/csv/i)) {
	csv = 'data:text/csv;charset=utf-8,' + csv;
}
filename = 'GooglePlayPurchases.csv';
data = encodeURI(csv);
link = document.createElement('a');
link.setAttribute('href', data);
link.setAttribute('download', filename);
link.click();
