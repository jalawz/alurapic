angular.module('alurapic').controller('FotoController', function($scope, $routeParams, cadastroDeFotos, recursoFoto) {

	$scope.foto = {};
	$scope.mensagem = '';


	if ($routeParams.fotoId) {

		recursoFoto.get({fotoId: $routeParams.fotoId}, function(foto) {
			$scope.foto = foto;
		}, function(erro) {
			console.log(erro);
			$scope.mensagem = "Nao foi possivel obter a foto";
		});

		// $http.get('v1/fotos/' + $routeParams.fotoId)
		// .success(function(foto) {
		// 	$scope.foto = foto;
		// })
		// .error(function(erro) {
		// 	console.log(erro);
		// 	$scope.mensagem = "Nao foi possivel obter a foto";
		// });
	}

	$scope.submeter = function() {
		if ($scope.formulario.$valid) {

			cadastroDeFotos.cadastrar($scope.foto)
			.then(function(dados) {
				$scope.mensagem = dados.mensagem;
				if (dados.inclusao) {
					$scope.formulario.$setPristine();
					$scope.foto = {};
				}
			})
			.catch(function(dados) {
				$scope.mensagem = dados.mensagem;
			});
		}
	};

});