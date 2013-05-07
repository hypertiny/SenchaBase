module SenchaBase::ApplicationHelper
  def current_app
    host = request.host.downcase
    if host.include?('devs')
      'devs'
    elsif host.include?('market')
      'market'
    elsif host.include?('id')
      'id'
    end
  end
end
