import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import { ScheduleAppointmentModal } from './ScheduleAppointmentModal';
import { CancelAppointmentModal } from './CancelAppointmentModal';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { appointments, updateStatus } = useAppointmentStore();

  // States pour les modals
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSchedule = (appointmentId: string) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      setSelectedAppointment(appointment);
      setIsScheduleModalOpen(true);
    }
  };

  const handleScheduleConfirm = (appointmentId: string, scheduleData: any) => {
    console.log('Scheduling appointment:', appointmentId, scheduleData);
    updateStatus(appointmentId, 'scheduled');
    setIsScheduleModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleCancel = (appointmentId: string) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      setSelectedAppointment(appointment);
      setIsCancelModalOpen(true);
    }
  };

  const handleCancelConfirm = (appointmentId: string, reason: string) => {
    console.log('Cancelling appointment:', appointmentId, 'Reason:', reason);
    updateStatus(appointmentId, 'cancelled');
    setIsCancelModalOpen(false);
    setSelectedAppointment(null);
  };

  const stats = {
    scheduled: appointments.filter(apt => apt.status === 'scheduled').length,
    pending: appointments.filter(apt => apt.status === 'pending').length,
    cancelled: appointments.filter(apt => apt.status === 'cancelled').length,
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'text-blue-400',
      scheduled: 'text-primary',
      cancelled: 'text-red-400',
    };
    return colors[status as keyof typeof colors] || 'text-gray-secondary';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: '⏳',
      scheduled: '✓',
      cancelled: '✕',
    };
    return icons[status as keyof typeof icons] || '';
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'Pending',
      scheduled: 'Scheduled',
      cancelled: 'Cancelled',
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <>
      <div className="min-h-screen bg-dark p-6">
        {/* Container principal */}
        <div className="max-w-7xl mx-auto bg-dark-light rounded-2xl border border-dark-lighter p-8">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-green">
                <span className="text-white text-xl font-bold">+</span>
              </div>
              <span className="text-white text-xl font-bold">CarePulse</span>
            </div>

            {/* Admin Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-dark rounded-lg border border-dark-lighter">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-sm">👤</span>
              </div>
              <span className="text-white text-sm font-medium">Admin</span>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-white text-3xl font-bold mb-2">Welcome, Admin 👋</h1>
            <p className="text-gray-secondary">Start day with managing new appointments</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Scheduled */}
            <div className="bg-dark rounded-xl p-6 border border-dark-lighter">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">📅</div>
                <div className="text-primary text-4xl font-bold">{stats.scheduled}</div>
              </div>
              <p className="text-gray-secondary text-sm">Total number of scheduled appointments</p>
            </div>

            {/* Pending */}
            <div className="bg-dark rounded-xl p-6 border border-dark-lighter">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">⏳</div>
                <div className="text-blue-400 text-4xl font-bold">{stats.pending}</div>
              </div>
              <p className="text-gray-secondary text-sm">Total number of pending appointments</p>
            </div>

            {/* Cancelled */}
            <div className="bg-dark rounded-xl p-6 border border-dark-lighter">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">⚠️</div>
                <div className="text-red-400 text-4xl font-bold">{stats.cancelled}</div>
              </div>
              <p className="text-gray-secondary text-sm">Total number of cancelled appointments</p>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-dark rounded-xl border border-dark-lighter overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-lighter">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-secondary uppercase">Patient</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-secondary uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-secondary uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-secondary uppercase">Doctor</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-secondary uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <p className="text-gray-secondary">No appointments found</p>
                      <p className="text-gray-secondary text-sm mt-1">Appointments will appear here once patients book them</p>
                    </td>
                  </tr>
                ) : (
                  appointments.map((appointment, index) => (
                    <tr key={appointment.id} className={`${index !== appointments.length - 1 ? 'border-b border-dark-lighter' : ''}`}>
                      {/* Patient */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                            index % 4 === 0 ? 'bg-green-500' :
                            index % 4 === 1 ? 'bg-blue-500' :
                            index % 4 === 2 ? 'bg-purple-500' :
                            'bg-pink-500'
                          }`}>
                            {appointment.patientName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </div>
                          <span className="text-white">{appointment.patientName}</span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-gray-secondary">
                        {new Date(appointment.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-2 ${getStatusColor(appointment.status)}`}>
                          <span>{getStatusIcon(appointment.status)}</span>
                          <span className="text-sm font-medium">{getStatusText(appointment.status)}</span>
                        </span>
                      </td>

                      {/* Doctor */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">Dr</span>
                          </div>
                          <span className="text-white text-sm">
                            {appointment.doctorId || 'Dr. Smith'}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          {appointment.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleSchedule(appointment.id)}
                                className="text-primary hover:text-primary-light text-sm font-medium transition"
                              >
                                Schedule
                              </button>
                              <button
                                onClick={() => handleCancel(appointment.id)}
                                className="text-red-400 hover:text-red-300 text-sm font-medium transition"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {appointment.status === 'scheduled' && (
                            <button
                              onClick={() => handleCancel(appointment.id)}
                              className="text-red-400 hover:text-red-300 text-sm font-medium transition"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center px-6 py-4 border-t border-dark-lighter">
              <button className="text-gray-secondary hover:text-white transition text-sm">
                ← 
              </button>
              <button className="text-gray-secondary hover:text-white transition text-sm ">
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Schedule Appointment */}
      {selectedAppointment && (
        <ScheduleAppointmentModal
          isOpen={isScheduleModalOpen}
          onClose={() => {
            setIsScheduleModalOpen(false);
            setSelectedAppointment(null);
          }}
          appointmentId={selectedAppointment.id}
          patientName={selectedAppointment.patientName}
          onSchedule={handleScheduleConfirm}
        />
      )}

      {/* Modal Cancel Appointment */}
      {selectedAppointment && (
        <CancelAppointmentModal
          isOpen={isCancelModalOpen}
          onClose={() => {
            setIsCancelModalOpen(false);
            setSelectedAppointment(null);
          }}
          appointmentId={selectedAppointment.id}
          patientName={selectedAppointment.patientName}
          onCancel={handleCancelConfirm}
        />
      )}
    </>
  );
};