if($scope.foto._id) {

	recursoFoto.update({fotoId : $scope.foto._id}, $scope.foto, function() {
		$scope.mensagem = "A foto " + $scope.foto.titulo + " foi alterada com sucesso";
	}, function(erro) {
		console.log(erro);
		$scope.mensagem = "Nao foi possivel alterar a foto " + $scope.foto.titulo;
	});

	// $http.put('v1/fotos/' + $scope.foto._id, $scope.foto)
	// .success(function() {
	// 	$scope.mensagem = "A foto " + $scope.foto.titulo + " foi alterada com sucesso";
	// })
	// .error(function(erro) {
	// 	console.log(erro);
	// 	$scope.mensagem = "Nao foi possivel alterar a foto " + $scope.foto.titulo;
	// });
} else {

	recursoFoto.save($scope.foto, function() {
		$scope.formulario.$setPristine();
		$scope.foto = {};
		$scope.mensagem = 'Foto incluida com sucesso';
	}, function(erro) {
		$scope.mensagem = 'Nao foi possivel incluir a foto';
		console.log(error);
	});

	// $http.post('v1/fotos', $scope.foto)
	// .success(function() {
	// 	$scope.formulario.$setPristine();
	// 	$scope.foto = {};
	// 	$scope.mensagem = 'Foto incluida com sucesso';
	// })
	// .error(function(error) {
	// 	$scope.mensagem = 'Nao foi possivel incluir a foto';
	// 	console.log(error);
	// });
}

scope.$watch('focado', function() {
	if (scope.focado) {
		element[0].focus();
		scope.focado = false;
	}
});