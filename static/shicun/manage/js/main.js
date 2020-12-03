jQuery(document).ready(function () {
	var accordionsMenu = $('.cd-accordion-menu');

	if (accordionsMenu.length > 0) {

		accordionsMenu.each(function () {
			var accordion = $(this);
			//detect change in the input[type="checkbox"] value
			accordion.on('change', 'input[type="checkbox"]', function () {
				var checkbox = $(this);
				console.log(checkbox.prop('checked'));
				(checkbox.prop('checked')) ? checkbox.siblings('ul').attr('style', 'display:none;').slideDown(300): checkbox.siblings('ul').attr('style', 'display:block;').slideUp(300);
			});
		});
	}
});

$("label").click(function (e) {
	let iframe = document.getElementById("iframe")
	switch (this.innerText) {
		case "用户管理":
			iframe.src = "./views/user-manage.html"
			break;
		case "论坛管理" || "帖子":
			iframe.src = "./views/forum-task.html#all"
			break;
		case "待审核":
			iframe.src = "./views/forum-task.html#filter"
			break;
		case "系统管理":
			iframe.src = "./views/system-state.html"
			break;
		case "反馈与建议":
			iframe.src = "./views/feedback.html"
			break;
	}
})