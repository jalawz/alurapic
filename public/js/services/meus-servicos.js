angular.module('meusServicos', ['ngResource'])

.factory('recursoFoto', function($resource) {

	return $resource('v1/fotos/:fotoId', null, {
		update : {
			method: 'PUT'
		}
	});
})

.factory('cadastroDeFotos', function(recursoFoto, $q, $rootScope) {
	var servico = {};

	var evento = 'fotoCadastrada';

	servico.cadastrar = function(foto) {
		return $q(function(resolve, reject) {
			if (foto._id) { // Se eh uma atualizacao

				recursoFoto.update({fotoId: foto._id}, foto, function() {
					$rootScope.$broadcast(evento);
					resolve({
						mensagem: 'Foto ' + foto.titulo + ' atualizada com sucesso!',
						inclusao: false
					});
				}, function(erro) {
					console.log(erro);
					reject({
						mensagem: 'Nao foi possivel alterar a foto ' + foto.titulo
					});
				});

			} else { // Se eh uma inclusao
				recursoFoto.save(foto, function() {
					$rootScope.$broadcast(evento);
					resolve({
						mensagem: 'Foto ' + foto.titulo + ' incluida com sucesso!',
						inclusao: true
					});
				}, function(erro) {
					console.log(erro);
					reject({
						mensagem: 'Nao foi possivel incluir a foto ' + foto.titulo
					});
				});
			}
		});
	};

	return servico;
});