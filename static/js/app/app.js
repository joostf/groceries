(function() {
	var $,$$;

	groceries = {
		init: function() {
			var self		= this,
				list 		= $('#list'),
				nav 		= $('nav'),
				storedState	= localStorage.getItem('state'),
				storedList 	= localStorage.getItem('list');

			storedList ? list.innerHTML = localStorage.getItem('list') : localStorage.setItem('list', list.innerHTML);

			routie({
			    '/edit'	: self.state.edit,
				'/shop'	: self.state.shop,
				'/clear': self.state.clear
			});

			routie('/' + storedState);

			FastClick.attach(document.body);
			
			list.addEventListener('keyup', this.update);
			list.addEventListener('click', this.check);
		},
		state: {
			edit: function () {
				localStorage.setItem('state', 'edit');
				list.contentEditable = true;
			},
			shop: function () {
				localStorage.setItem('state', 'shop');
				list.contentEditable = false;
			},
			clear: function () {
				var els = $$('#list li'),
					i 	= els.length;
				
				while (i--) {
					els[i].classList.remove('checked');
				}
			}
		},
		update: function (e) {
			var el = e.target;
			e.preventDefault();

			e.keyCode === 13 || e.keyCode === 8 ? localStorage.setItem('list', el.innerHTML) : console.log(e.keyCode);
		},
		check: function (e) {
			var el = e.target;
			list.contentEditable === 'false' ? el.classList.toggle('checked') : console.log('edit mode');
			localStorage.setItem('list', el.parentNode.innerHTML);
		}

	};

	utils = {
		init: function() {
			$  = this.selectElement, 
			$$ = this.selectElements
		},
		selectElement: function(el) {
			return document.querySelector(el);
		},
		selectElements: function(el) {
			return document.querySelectorAll(el);
		},
		toggle:function(element) {
			element.classList.toggle('active');			
		}
	};

	utils.init();
	groceries.init();

})();

