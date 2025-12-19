import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../shared/components/Card';
import { ListPagination } from '../shared/components/ListPagination';
import ModalVacantes from './ModalVacantes';
import { useNotification } from '../shared/components/useNotification';
import * as vacService from './service/vacantes.service';
import * as posService from './service/postulaciones.service';

// Modelo de vacante
type Vacante = {
    id?: number;
    titulo: string;
    descripcion: string;
    nivelEducativoRequerido?: string;
    experienciaMinima?: number;
    ubicacion: string;
    empleadorId?: number;
    fechaPublicacion?: string;
    nombreEmpresa?: string;
};

const VacantesPage: React.FC = () => {
    const { user } = useAuth();
    const [vacantes, setVacantes] = React.useState<Vacante[]>([]);
    const [selectedVacante, setSelectedVacante] = React.useState<Vacante | null>(null);
    const [modalTipo, setModalTipo] = React.useState<'aplicantes' | 'registrar' | 'detalle'>('aplicantes');
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const { notify, confirm } = useNotification();

    const openModal = (tipo: 'aplicantes' | 'registrar' | 'detalle', vacante: Vacante | null) => {
        setSelectedVacante(vacante);
        setModalTipo(tipo);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedVacante(null);
        setIsModalOpen(false);
    };

    const loadVacantes = async () => {

        try {
            const res: any = await vacService.findVacantes();

            if (!res.success) {
                notify('Error', `No fue posible cargar los postulados: ${res.message || 'Error desconocido'}`, 'error');
                return;
            }

            setVacantes(Array.isArray(res.data.listFind) ? res.data.listFind : []);
        } catch (error: any) {
            notify(
                'Error',
                `Ocurrió un error al cargar los postulados: ${error?.message || 'Error desconocido'}`,
                'error'
            );
        }
    };

    React.useEffect(() => {
        loadVacantes();
    }, []);

    // Paginación
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(6);

    // Calcular vacantes visibles según paginación
    const paginatedVacantes = React.useMemo(() => {
        const start = (page - 1) * pageSize;
        if (start >= vacantes.length) return [];
        return vacantes.slice(start, start + pageSize);
    }, [vacantes, page, pageSize]);

    const handleInscribirse = async (vacante: Vacante) => {
        const ok = await confirm({
            title: '¿Deseas inscribirte?',
            message: `Te vas a postular a la vacante "${vacante?.titulo}"`,
            confirmText: 'Sí, inscribirme',
            cancelText: 'Cancelar',
        });

        if (!ok) return;
        try {
            const res: any = await posService.createPostulaciones({
                vacanteId: vacante.id,
                usuarioId: user?.id,
            });

            if (!res.success) {
                notify('Error', `No fue posible inscribirse: ${res.message || 'Error desconocido'}`, 'error');
                return;
            }

            notify(
                'Postulación enviada',
                'Te has inscrito correctamente a la vacante',
                'success'
            );
        } catch (error: any) {
            notify(
                'Error',
                `Ocurrió un error al inscribirse: ${error?.message || 'Error desconocido'}`,
                'error'
            );
            return;
        }

        notify(
            'Postulación enviada',
            'Te has inscrito correctamente a la vacante',
            'success'
        );
    };

    const renderCardActions = (vacante: Vacante) => {
        const buttonDetalle = (<div className="flex flex-wrap gap-2 mt-4">
            {/* Ver habilidades de la vacante */}
            <button
                onClick={() => openModal('detalle', vacante)}
                className="
            inline-flex items-center gap-1
            bg-yellow-600 hover:bg-yellow-700
            text-white text-sm font-medium
            px-3 py-1.5 rounded-md
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-indigo-400
          "
            >
                📋
                <span>Habilidades requeridas</span>
            </button>
        </div>);

        if (user?.rol === 'EMPLEADOR' && vacante?.empleadorId === user?.empleadorId) {
            return (
                <>
                    {buttonDetalle}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {/* Ver postulados */}
                        <button
                            onClick={() => openModal('aplicantes', vacante)}
                            className="
            inline-flex items-center gap-1
            bg-blue-600 hover:bg-blue-700
            text-white text-sm font-medium
            px-3 py-1.5 rounded-md
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-indigo-400
          "
                        >
                            👥
                            <span>Postulados</span>
                        </button>
                    </div>
                </>
            );
        }

        if (user?.rol === 'DEMANDANTE') {
            return (
                <>
                    {buttonDetalle}
                    <div className="flex flex-wrap gap-2 mt-4">
                        <button
                            onClick={() => handleInscribirse(vacante)}
                            className="inline-flex items-center gap-1
            bg-green-600 hover:bg-green-700
            text-white text-sm font-medium
            px-3 py-1.5 rounded-md
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            Inscribirme
                        </button>
                    </div>
                </>
            );
        }

        return null;
    };

    function parseFecha(fecha: string | undefined): Date | null {
        if (!fecha) return null;

        const limpia = fecha
            .replace(/\u202F/g, ' ')
            .replace('a. m.', 'AM')
            .replace('p. m.', 'PM');

        const [fechaParte, horaParte, ampm] = limpia.split(' ');
        const [day, month, year] = fechaParte.split('/').map(Number);
        const [hour, minute, second] = horaParte.split(':').map(Number);

        let horas = hour;
        if (ampm === 'PM' && horas < 12) horas += 12;
        if (ampm === 'AM' && horas === 12) horas = 0;

        return new Date(year, month - 1, day, horas, minute, second);
    }

    return (
        <>
            <div className="min-h-screen p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {user?.rol === 'EMPLEADOR' ? 'Mis Vacantes' : 'Vacantes Disponibles'}
                    </h2>
                    {user?.rol === 'EMPLEADOR' && (
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                            onClick={() => openModal('registrar', null)}
                        >
                            Agregar Vacante
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedVacantes.length === 0 ? (
                        <p className="text-gray-500 col-span-full">No hay vacantes disponibles</p>
                    ) : (
                        paginatedVacantes.map(vacante => (
                            <Card key={vacante?.id} className="flex flex-col justify-between">
                                <CardHeader>
                                    <CardTitle>{vacante?.titulo}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p><strong>Descripción:</strong> {vacante?.descripcion}</p>
                                    <p><strong>Ubicación:</strong> {vacante?.ubicacion}</p>
                                    <p><strong>Nivel Educativo Requerido:</strong> {vacante?.nivelEducativoRequerido || 'No especificado'}</p>
                                    <p><strong>Experiencia Mínima:</strong> {vacante?.experienciaMinima != null ? `${vacante.experienciaMinima} años` : 'No especificada'}</p>
                                    <p><strong>Empresa:</strong> {vacante?.nombreEmpresa}</p>
                                    <p><strong>Fecha Publicación:</strong> {' '}
                                        {(() => {
                                            const fecha = parseFecha(vacante?.fechaPublicacion);
                                            return fecha
                                                ? fecha.toLocaleDateString('es-CO')
                                                : 'No disponible';
                                        })()}</p>
                                </CardContent>
                                <div className="px-6 pb-4">{renderCardActions(vacante)}</div>
                            </Card>
                        ))
                    )}
                </div>

                {/* Paginación */}
                <div className="mt-6 flex justify-end">
                    <ListPagination
                        page={page}
                        pageSize={pageSize}
                        total={vacantes.length}
                        onPageChange={setPage}
                        onPageSizeChange={setPageSize}
                    />
                </div>
            </div>

            <ModalVacantes
                open={isModalOpen}
                tipo={modalTipo}
                vacante={selectedVacante}
                onClose={closeModal}
            />
        </>
    );
};

export default VacantesPage;
