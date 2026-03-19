import { useState } from 'react';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  PayPillLogo,
  ShieldIcon,
  LockIcon,
  UnlockIcon,
  CheckIcon,
  AlertIcon,
  ChevronLeftIcon,
  TrashIcon,
  FileTextIcon,
  ActivityIcon,
  ZapIcon,
  UserIcon,
  EyeIcon,
  DatabaseIcon
} from '@/components/Icons';

export function PrivacyDashboard() {
  const { state, dispatch } = useApp();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const auditLogs = state.auditLogs;

  const handleDeleteData = () => {
    dispatch({ type: 'RESET_STATE' });
    setShowDeleteDialog(false);
    dispatch({ type: 'SET_VIEW', payload: 'landing' });
  };

  const handleDisconnectInsurance = () => {
    dispatch({ type: 'SET_INSURANCE', payload: null });
    setShowDisconnectDialog(false);
  };

  const getActionIcon = (action: string, aiEngine: boolean) => {
    if (aiEngine) return <ZapIcon size={16} className="text-purple-600" />;
    if (action.includes('Insurance')) return <ShieldIcon size={16} className="text-mfp-blue-600" />;
    if (action.includes('Profile') || action.includes('Update')) return <UserIcon size={16} className="text-mfp-blue-600" />;
    return <EyeIcon size={16} className="text-gray-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'dashboard' })}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              <ChevronLeftIcon size={20} />
              <span className="text-sm hidden sm:inline">Back to Dashboard</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <PayPillLogo size={40} className="sm:w-12" />
            <span className="text-lg sm:text-xl font-black text-foreground tracking-tight">PayPill</span>
          </div>

          <div className="w-20" />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Privacy Shield Hero */}
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-mfp-blue-500 mb-6 shadow-lg shadow-mfp-blue-500/30">
              <ShieldIcon size={48} className="text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Privacy Shield
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Your health data is encrypted, protected, and always under your control.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <Badge className="bg-green-100 text-green-700 border-0 px-4 py-1.5 font-semibold">
                <LockIcon size={14} className="mr-1.5" />
                AES-256 Encrypted
              </Badge>
              <Badge className="bg-mfp-blue-100 text-mfp-blue-700 border-0 px-4 py-1.5 font-semibold">
                <CheckIcon size={14} className="mr-1.5" />
                HIPAA Compliant
              </Badge>
            </div>
          </div>

          {/* Data Controls */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Encryption Status */}
            <div className="mfp-card p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                  <LockIcon size={28} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Encryption Active</h3>
                  <p className="text-sm text-gray-500">All data is encrypted at rest</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <DatabaseIcon size={20} className="text-gray-400" />
                    <span className="text-sm font-semibold text-gray-700">Health Records</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-green-600 font-semibold">Encrypted</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <ShieldIcon size={20} className="text-gray-400" />
                    <span className="text-sm font-semibold text-gray-700">Insurance Data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-green-600 font-semibold">Encrypted</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <ActivityIcon size={20} className="text-gray-400" />
                    <span className="text-sm font-semibold text-gray-700">Activity Logs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-green-600 font-semibold">Encrypted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Controls */}
            <div className="mfp-card p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-mfp-blue-100 flex items-center justify-center">
                  <ActivityIcon size={28} className="text-mfp-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Privacy Controls</h3>
                  <p className="text-sm text-gray-500">Manage your data preferences</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-semibold text-gray-900">AI Recommendations</Label>
                    <p className="text-xs text-gray-500">Allow AI to analyze your data</p>
                  </div>
                  <Switch
                    checked={aiRecommendations}
                    onCheckedChange={setAiRecommendations}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-semibold text-gray-900">Data Sharing</Label>
                    <p className="text-xs text-gray-500">Share with providers</p>
                  </div>
                  <Switch
                    checked={dataSharing}
                    onCheckedChange={setDataSharing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-semibold text-gray-900">Marketing Emails</Label>
                    <p className="text-xs text-gray-500">Product updates and tips</p>
                  </div>
                  <Switch
                    checked={marketingEmails}
                    onCheckedChange={setMarketingEmails}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mfp-card p-6 border-2 border-red-100 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertIcon size={24} className="text-red-600" />
              <h3 className="font-bold text-red-900 text-lg">Danger Zone</h3>
            </div>

            <div className="space-y-4">
              {state.insurance && (
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-red-900">Disconnect Insurance</p>
                    <p className="text-sm text-red-700">Remove your insurance connection</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowDisconnectDialog(true)}
                    className="border-red-300 text-red-700 hover:bg-red-100 font-semibold"
                  >
                    Disconnect
                  </Button>
                </div>
              )}

              <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                <div>
                  <p className="font-semibold text-red-900">Delete All Data</p>
                  <p className="text-sm text-red-700">Permanently delete your account and all health data</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(true)}
                  className="border-red-300 text-red-700 hover:bg-red-100 font-semibold"
                >
                  <TrashIcon size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>

          {/* Audit Log */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileTextIcon size={20} className="text-mfp-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Data Access Audit Log</h2>
              </div>
              <Badge className="bg-gray-100 text-gray-700 border-0 font-semibold">
                {auditLogs.length} entries
              </Badge>
            </div>

            <div className="mfp-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-6 py-4">
                        Action
                      </th>
                      <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-6 py-4">
                        Data Accessed
                      </th>
                      <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-6 py-4">
                        Source
                      </th>
                      <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-6 py-4">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                              {getActionIcon(log.action, log.aiEngine)}
                            </div>
                            <span className="font-semibold text-gray-900">{log.action}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {log.dataAccessed.map((data) => (
                              <Badge
                                key={data}
                                variant="secondary"
                                className="text-xs bg-gray-100 text-gray-600 font-medium"
                              >
                                {data}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {log.aiEngine ? (
                            <Badge className="bg-purple-100 text-purple-700 border-0 font-semibold">
                              <ZapIcon size={12} className="mr-1" />
                              AI Engine
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-700 border-0 font-semibold">
                              <UserIcon size={12} className="mr-1" />
                              User
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(log.timestamp).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Data Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-700">
              <AlertIcon size={20} />
              Delete All Data
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. All your health records, medications, 
              and personal information will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> You will lose access to all AI recommendations, 
              saved providers, and health timeline data.
            </p>
          </div>
          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteData}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              <TrashIcon size={16} className="mr-2" />
              Delete Everything
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Disconnect Insurance Dialog */}
      <Dialog open={showDisconnectDialog} onOpenChange={setShowDisconnectDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-700">
              <ShieldIcon size={20} />
              Disconnect Insurance
            </DialogTitle>
            <DialogDescription>
              Your insurance information will be removed. You won't see 
              in-network providers or coverage estimates until you reconnect.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setShowDisconnectDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleDisconnectInsurance}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold"
            >
              <UnlockIcon size={16} className="mr-2" />
              Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
