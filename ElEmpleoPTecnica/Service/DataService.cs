using LibraryDBApi.Core;
using LibraryDBApi.Models;
using LibStoredProcedureParameters = LibraryDBApi.Models.StoredProcedureParameters;
using LibModelPaginacion = LibraryDBApi.Models.ModelPaginacion;
using ElEmpleoPTecnica.Interface;
using ElEmpleoPTecnica.Models;

namespace ElEmpleoPTecnica.Services
{
    public class DataService : BaseDataService, Interface.IDataService
    {
        private readonly IConfiguration _configuration;
        private readonly IRequest _requestService;
        private readonly string connectionString;

        public DataService(IConfiguration configuration, IRequest requestService)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DBConnection")!;
            _requestService = requestService;
        }

        public async Task<PagedResult_Model<TResult>> EjecutarProcedimientoAsync<TResult>(string nombreProcedimiento, object parametros) where TResult : new()
        {
            try
            {
                var libParameters = new LibStoredProcedureParameters
                {
                    ConnectionString = this.connectionString,
                    ProcedureName = nombreProcedimiento,
                    Model = parametros,
                    ModelPaginacion = CreateModelPaginacion()
                };

                var result = await base.EjecutarProcedimientoAsync<TResult>(libParameters);
                return PagedResult_Model<TResult>.PaginatedResponse(result);
            }
            catch (Exception ex)
            {
                return PagedResult_Model<TResult>.Failure(ex);
            }
        }

        public async Task<PagedResult_Model<TResult>> EjecutarProcedimientoAsync<TResult>(string procedureName) where TResult : new()
        {
            try
            {
                var result = await base.EjecutarProcedimientoAsync<TResult>(connectionString, procedureName, CreateModelPaginacion());

                return PagedResult_Model<TResult>.PaginatedResponse(result);
            }
            catch (Exception ex)
            {
                return PagedResult_Model<TResult>.Failure(ex);
            }
        }

        private LibModelPaginacion? CreateModelPaginacion()
        {
            var modelPaginacion = _requestService.GetPaginationParameters();
            return modelPaginacion != null ? new LibModelPaginacion
            {
                PageNumber = modelPaginacion.PageNumber,
                PageSize = modelPaginacion.PageSize,
                Filter = modelPaginacion.Filter
            } : null;
        }
    }
}
